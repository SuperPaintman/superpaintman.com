#!/usr/bin/env node

'use strict';
/** Requires */
const path      = require('path');
const fs        = require('fs');
const assert    = require('assert');

const co        = require('co');
const Joi       = require('joi');
const cheerio   = require('cheerio');
const mkdirp    = require('mkdirp');
const minimist  = require('minimist');

const request   = require('request-promise');


/** Constants */
const userStatsSchema = Joi.object({
  username:    Joi.string().trim().regex(/^[a-z0-9]+$/i),
  avatar:      Joi.string().uri(),
  karma:       Joi.number(),
  rating:      Joi.number().min(0),
  subscribers: Joi.number().min(0).integer(),
  posts:       Joi.number().min(0).integer(),
  comments:    Joi.number().min(0).integer(),
  favorites:   Joi.number().min(0).integer()
});

const postSchema = Joi.object({
  title:       Joi.string().trim(),
  topic:       Joi.string().trim(),
  // published:   Joi.date(),
  isTutorial:  Joi.boolean(),
  isSandbox:   Joi.boolean(),
  hubs:        Joi.array().items(Joi.string().trim()),
  body:        Joi.string().trim(),
  score:       Joi.number().min(0).integer(),
  views:       Joi.number().min(0).integer(),
  favorites:   Joi.number().min(0).integer(),
  comments:    Joi.number().min(0).integer()
});

const postsSchema = Joi.array().items(postSchema);


/** Init */
const argv = minimist(process.argv.slice(2));


class HabrApi {
  constructor(username) {
    this.username = username;

    this._rp = request.defaults({
      jar:      true,
      timeout:  30000,
      headers: {
        'User-Agent': 'Crawler'
      },
      agentOptions: {
        keepAlive:  true
      },
      gzip:     true,
      resolveWithFullResponse: true
    });
  }

  getStats() {
    const self = this;

    return co(function * () {
      const res = yield self._rp(`https://habrahabr.ru/users/${self.username}/`);

      const { body, statusCode } = res;

      assert(statusCode === 200);

      const $ = cheerio.load(body);

      const $layout = $('.layout > .layout__row_body > .layout__cell_body');

      const $username = $layout.find('.page-header__nickname');

      const $avatar = $layout.find('.author-info__image-pic');

      const $meta = $layout.find('.page-header__user-data > .page-header__stats');
      const $metaKarma       = $($meta[0]).find('.page-header__stats-value');
      const $metaRating      = $($meta[1]).find('.page-header__stats-value');
      const $metaSubscribers = $($meta[2]).find('.page-header__stats-value');

      const $tabs = $layout.find('.tabs__level > .tabs-menu__item');
      const $tabPosts     = $($tabs[1]).find('.tabs-menu__item-counter');
      const $tabComments  = $($tabs[2]).find('.tabs-menu__item-counter');
      const $tabFavorites = $($tabs[3]).find('.tabs-menu__item-counter');

      const data = {
        username:     $username.text(),
        avatar:       'https:' + $avatar.attr('src'),
        karma:        parseFloat($metaKarma.text().replace(',', '.')),
        rating:       parseFloat($metaRating.text().replace(',', '.')),
        subscribers:  parseFloat($metaSubscribers.text().replace(',', '.')),
        posts:        parseInt($tabPosts.text(), 10),
        comments:     parseInt($tabComments.text(), 10),
        favorites:    parseInt($tabFavorites.text(), 10)
      };


      const validData = yield new Promise((resolve, reject) => {
        Joi.validate(data, userStatsSchema, {
          stripUnknown: {
            arrays: false,
            objects: true
          },
          presence: 'required'
        }, (err, data) => err ? reject(err) : resolve(data));
      });

      return validData;
    });
  }

  getPosts() {
    const self = this;

    return co(function * () {
      const posts = [];

      let totalPages;

      let i = 1;
      do {
        const res = yield self._rp(`https://habrahabr.ru/users/${self.username}/topics/page${i}`);

        const { body, statusCode } = res;

        assert(statusCode === 200);

        const $ = cheerio.load(body);

        if (!totalPages) {
          const $pageBtns = $('.page__footer > .toggle-menu > .toggle-menu__item');

          totalPages = $pageBtns.length
                     ? parseInt($pageBtns.last().text(), 10)
                     : 1;
        }

        const $posts = $('.posts > .post');

        $posts.each((i, post) => {
          const $post = $(post);

          const $published    = $post.find('.post__time_published');

          const $title        = $post.find('.post__title > .post__title_link');
          const $topic        = $post.find('.post__title > .post__flow');
          const $flagTutorial = $post.find('.post__title > .flag_tutorial');
          const $flagSandbox  = $post.find('.post__title > .flag_sandbox');

          const $hubs         = $post.find('.hubs > .hub');

          const $body         = $post.find('.post__body > .content');

          const $footer       = $post.find('.post__footer ul > li');
          const $score        = $($footer[0]).find('.js-score');
          const $views        = $($footer[1]).find('.views-count_post');
          const $favorites    = $($footer[2]).find('.js-favs_count');
          const $comments     = $($footer[4]).find('.post-comments__link_all');

          const published = $published.text().trim();

          const body = $body.html().replace(/&#x([0-9A-F]{3});/g, (match, n) =>
            String.fromCharCode(parseInt(n, 16)));

          const score = parseInt($score.text(), 10);

          const viewsText = $views.text().trim();
          const views = /k$/.test(viewsText)
                      ? parseFloat(viewsText.replace(',', '.')) * 1000
                      : parseInt(viewsText.replace(',', '.'), 10);

          const comments = parseInt($comments.text(), 10);

          posts.push({
            title:      $title.text(),
            topic:      $topic.text(),
            published:  published,
            isTutorial: !!$flagTutorial.length,
            isSandbox:  !!$flagSandbox.length,
            hubs:       $hubs.map((i, hub) => $(hub).text()).toArray(),
            body:       body,
            score:      isNaN(score) ? 0 : score,
            views:      views,
            favorites:  parseInt($favorites.text(), 10),
            comments:   isNaN(comments) ? 0 : comments,
          });
        });

        i++;
      } while (i <= totalPages);

      const validPosts = yield new Promise((resolve, reject) => {
        Joi.validate(posts.reverse(), postsSchema, {
          stripUnknown: {
            arrays: false,
            objects: true
          },
          presence: 'required'
        }, (err, data) => err ? reject(err) : resolve(data));
      });

      return validPosts;
    });
  }
}


/** Start */
co(function * () {
  const api = new HabrApi('superpaintman');

  const [
    stats,
    posts
  ] = yield [
    api.getStats(),
    api.getPosts()
  ];

  const res = JSON.stringify({
    stats,
    posts
  }, null, argv.p ? 2 : 0);

  if (!argv.o) {
    process.stdout.write(res);
    return;
  }

  yield new Promise((resolve, reject) => {
    mkdirp(path.parse(argv.o).dir, (err) => err ? reject(err) : resolve());
  });

  yield new Promise((resolve, reject) => {
    fs.writeFile(argv.o, res, (err) => err ? reject(err) : resolve());
  });
})
.catch((err) => {
  console.error(err);

  process.exit(1);
});
