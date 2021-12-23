<script lang="ts">
  import Header from '~/components/Header.svelte';
  import Footer from '~/components/Footer.svelte';
  import Splash from '~/components/Splash.svelte';

  const src: string = require(`~/images/avatar.jpg?{
    sizes: [256, 128]
  }`).src;

  type Link = {
    name: string;
    url: string;
    title: string;
  };

  const links: Link[] = [
    {
      name: 'GitHub',
      url: '#',
      title: 'GitHub'
    },
    {
      name: 'LinkedIn',
      url: '#',
      title: 'LinkedIn'
    },
    {
      name: 'Telegram',
      url: '#',
      title: 'Telegram'
    },
    {
      name: 'Habr',
      url: '#',
      title: 'Habr'
    },
    {
      name: 'Medium',
      url: '#',
      title: 'Medium'
    },
    {
      name: 'Instagram',
      url: '#',
      title: 'Instagram'
    },
    {
      name: 'SuperPaintmanDeveloper@gmail.com',
      url: '#',
      title: 'SuperPaintmanDeveloper@gmail.com'
    }
  ];

  const linkSplashOpacity = 0.03;
  const linkSplashRadius = 128 * 1.5;
  const linkSplashes = [
    {
      top: 16,
      left: 16 * 4,
      color: 0x00aaff,
      opacity: linkSplashOpacity
    },
    {
      bottom: -16,
      right: 16 * 16,
      color: 0x6b24ff,
      opacity: linkSplashOpacity
    },
    {
      bottom: 16,
      right: 16 * 5,
      color: 0xff0044,
      opacity: linkSplashOpacity
    }
  ];
</script>

<div class="root">
  <Header />

  <main>
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
                alt="Aleksandr Krivoshchekov (@SuperPaintman) Photo"
              />
            </div>
          </div>
          <h1 class="fullname">Aleksandr Krivoshchekov</h1>
          <div class="current-title">Lead Software Engineer</div>
        </div>

        <ul class="links">
          {#each links as { name, title, url } (name)}
            <li>
              <a class="link" href={url} {title} target="_table">
                <Splash splashes={linkSplashes} radius={linkSplashRadius} />

                <div class="inner">
                  <div>{name}</div>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </main>

  <Footer />
</div>

<style lang="stylus">
  $photo-size = 128px;
  $photo-border-padding = 4px;

  .root {
    overflow: hidden;
  }

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

  .link {
    display: block;
    position: relative;

    margin-bottom: 16px;

    border: 2px solid #ffffff;
    border-radius: 4px;

    color: inherit;
    font-size: 16px;
    line-height: 16px;
    text-decoration: none;
  }

  .link .inner {
    position: relative;

    padding: 16px 32px;

    background-color: #ffffff;

    overflow: hidden;
  }
</style>