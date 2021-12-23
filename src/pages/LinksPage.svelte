<script lang="ts">
  import Header from '~/components/Header.svelte';
  import Footer from '~/components/Footer.svelte';

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
</script>

<div>
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
                <div class="blur-outer-box">
                  <div class="blur blur-1" />
                  <div class="blur blur-2" />
                  <div class="blur blur-3" />
                </div>

                <div class="inner">
                  <!-- <div class="blur-box">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                  </div> -->

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

  $blur-base-size = 2px;
  $blur-radius = 128px;
  // $blur-radius = 16px;
  $blur-color-1 = rgba(#ff0044, 0.1);
  $blur-color-2 = rgba(#6b24ff, 0.1);
  $blur-color-3 = rgba(#00aaff, 0.1);
  $blur-outer-color-3 = rgba(#ff0044, 0.03);
  $blur-outer-color-2 = rgba(#6b24ff, 0.03);
  $blur-outer-color-1 = rgba(#00aaff, 0.03);
  // $blur-color-1 = rgba(#ff0044, 0.5);
  // $blur-color-2 = rgba(#6b24ff, 0.5);
  // $blur-color-3 = rgba(#00aaff, 0.5);

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

    margin: 64px 0;
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

    top: -1 * $photo-border-padding;
    left: -1 * $photo-border-padding;

    width: $photo-size + $photo-border-padding * 2;
    height: @width;

    outline: 2px solid #ffffff;
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

  .blur-box {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    // z-index: -1;
  }

  .blur-outer-box {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    z-index: -1;
  }

  .blur {
    position: absolute;

    width: $blur-base-size;
    height: $blur-base-size;

    border-radius: 50%;
  }

  .blur-1 {
    top: 16px;
    left: 16px * 4;

    background-color: $blur-color-1;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-2 {
    bottom: -16px;
    right: 16px * 16;

    background-color: $blur-color-2;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-3 {
    bottom: 16px;
    right: 16px * 5;

    background-color: $blur-color-3;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-outer-box .blur-1 {
    background-color: $blur-outer-color-1;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-outer-box .blur-2 {
    background-color: $blur-outer-color-2;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-outer-box .blur-3 {
    background-color: $blur-outer-color-3;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }
</style>
