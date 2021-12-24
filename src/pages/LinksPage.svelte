<script lang="ts">
  import { SeoTitle, SeoDescription } from '~/components/seo';
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
  $photo-size = 128px;
  $photo-border-padding = 4px;

  .container {
    max-width: 1200px;

    margin: 32px auto;
    padding: 0 32px;

    box-sizing: border-box;
  }

  .main {
    max-width: 512px;

    margin: auto;
    padding: 0 $photo-size + $photo-border-padding * 2 + 32px;
  }

  .about {
    position: relative;

    margin: 64px + 32px 0;
  }

  .photo {
    position: absolute;

    width: $photo-size;
    height: @width;

    top: (-48px / 2);
    left: -1 * @width - 32px;

    background: #ffffff;

    border-radius: 50%;
  }

  .photo .inner {
    width: $photo-size;
    height: @width;

    overflow: hidden;

    border-radius: 50%;
  }

  .photo-border {
    position: absolute;

    top: -1 * $photo-border-padding - 2px;
    left: -1 * $photo-border-padding - 2px;

    width: $photo-size + $photo-border-padding * 2;
    height: @width;

    border: 2px solid #ffffff;
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
  }

  .current-title {
    font-size: 24px;
    font-weight: 400;
    line-height: 48px;
  }

  .links {
    padding: 0;
    margin: 64px 0;

    list-style: none;
  }
</style>
