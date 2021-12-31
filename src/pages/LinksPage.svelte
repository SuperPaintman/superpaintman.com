<!--!
 * Copyright (C) 2017-2021 Aleksandr Krivoshchekov <SuperPaintmanDeveloper@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
-->
<script lang="ts">
  import { SeoTitle, SeoDescription, SeoCanonical } from '~/components/seo';
  import LinkItem from '~/components/LinkItem.svelte';

  const src: string = require(`~/images/avatar.jpg?{
    sizes: [256, 128]
  }`).src;

  type Link = {
    type: string;
    name: string;
    url: string;
    title: string;
  };

  const links: Link[] = [
    {
      type: 'github',
      name: 'GitHub',
      url: 'https://github.com/SuperPaintman/',
      title: 'GitHub'
    },
    {
      type: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/superpaintman/',
      title: 'LinkedIn'
    },
    {
      type: 'telegram',
      name: 'Telegram',
      url: 'https://t.me/superpaintman',
      title: 'Telegram'
    },
    {
      type: 'habr',
      name: 'Habr',
      url: 'https://habr.com/ru/users/superpaintman/',
      title: 'Habr'
    },
    {
      type: 'medium',
      name: 'Medium',
      url: 'https://medium.com/@SuperPaintman',
      title: 'Medium'
    },
    {
      type: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/superpaintman/',
      title: 'Instagram'
    },
    {
      type: 'email',
      name: 'SuperPaintmanDeveloper@gmail.com',
      url: 'SuperPaintmanDeveloper@gmail.com',
      title: 'Email'
    }
  ];

  function linkSplashOffsetX(i: number, length: number): number {
    if (length <= 1) {
      return 0;
    }

    const size = Math.sin(Math.PI * 2 * (i / (length - 1)));

    return Math.ceil(size * 92);
  }

  const photoAlt = 'Aleksandr Krivoshchekov (@SuperPaintman) Photo';
</script>

<SeoTitle value="Aleksandr Krivoshchekov (SuperPaintman) - Links" />
<SeoDescription
  value="Aleksandr Krivoshchekov's (SuperPaintman) personal links."
/>
<SeoCanonical value="https://superpaintman.com" />

<div class="root">
  <div class="container">
    <div class="main">
      <div class="about">
        <div class="photo">
          <div class="photo-border" />

          <div class="inner">
            <img
              class="photo-image"
              width={128}
              height={128}
              {src}
              alt={photoAlt}
            />
          </div>
        </div>
        <h1 class="fullname">Aleksandr Krivoshchekov</h1>
        <div class="current-title">Lead Software Engineer</div>
      </div>

      <ul class="links">
        {#each links as { type, name, title, url }, i (type)}
          <li>
            <LinkItem
              {name}
              {title}
              {url}
              splashOffsetX={linkSplashOffsetX(i, links.length)}
              isEmail={type === 'email'}
            />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style lang="stylus">
  $main-max-width = 512px;
  $photo-size = 128px;
  $photo-border = 3px;
  $photo-border-padding = 0;

  .container {
    max-width: 1200px;

    margin: 32px auto;
    padding: 0 32px;

    box-sizing: border-box;

    @media (max-width: 1024px) {
      margin-top: 0;
    }

    @media (max-width: $main-max-width) {
      padding: 0 16px;
    }
  }

  .main {
    max-width: $main-max-width;

    margin: auto;
    padding: 0 $photo-size + $photo-border-padding * 2 + 32px;

    @media (max-width: 1024px) {
      padding: 0 32px;
    }

    @media (max-width: 512px) {
      padding: 0;
    }
  }

  .about {
    position: relative;

    margin: 64px + 32px 0;

    @media (max-width: 1024px) {
      margin-top: 0;
      margin-bottom: 32px;
    }
  }

  .photo {
    position: absolute;

    width: $photo-size;
    height: @width;

    top: (-48px / 2);
    left: -1 * @width - 32px;

    background: #ffffff;

    border-radius: 50%;

    @media (max-width: 1024px) {
      position: relative;

      top: 0;
      left: 0;

      margin: 32px auto;
    }
  }

  .photo .inner {
    width: $photo-size;
    height: @width;

    overflow: hidden;

    border-radius: 50%;
  }

  .photo-border {
    position: absolute;

    top: 0 - $photo-border-padding - $photo-border;
    left: 0 - $photo-border-padding - $photo-border;

    width: $photo-size + $photo-border-padding * 2;
    height: @width;

    border: $photo-border solid #ffffff;
    border-radius: 50%;

    z-index: -1;
  }

  .photo-image {
    margin: 0;
    padding: 0;
  }

  .fullname {
    margin: 0;
    padding: 0;

    font-size: 42px;
    font-weight: 700;
    line-height: 48px;

    @media (max-width: $main-max-width) {
      font-size: 24px;
      line-height: 32px;
      text-align: center;
    }
  }

  .current-title {
    font-size: 24px;
    font-weight: 400;
    line-height: 48px;

    @media (max-width: $main-max-width) {
      font-size: 20px;
      line-height: 32px;
      text-align: center;
    }
  }

  .links {
    padding: 0;
    margin: 64px 0;

    list-style: none;

    @media (max-width: $main-max-width) {
      margin-top: 38px;
    }
  }
</style>
