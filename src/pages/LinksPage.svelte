<script lang="ts">
  import { onMount } from 'svelte';
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

  function hexToRgb(v: number): string {
    const r = (v >> 16) & 0xff;
    const g = (v >> 8) & 0xff;
    const b = v & 0xff;

    return `${r}, ${g}, ${b}`;
  }

  // See: https://medium.com/airbnb-engineering/css-box-shadow-can-slow-down-scrolling-d8ea47ec6867.
  function renderBlurBox(elem: HTMLDivElement) {
    const width = elem.offsetWidth;
    const height = elem.offsetHeight;

    type Blur = {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
      color?: number;
      opacity?: number;
    };

    const blurRadius = 128 * 2;
    const blurOpacity = 0.03;

    const blurs: Blur[] = [
      {
        top: 16,
        left: 16 * 4,
        color: 0x00aaff,
        opacity: blurOpacity
      },
      {
        bottom: -16,
        right: 16 * 16,
        color: 0x6b24ff,
        opacity: blurOpacity
      },
      {
        bottom: 16,
        right: 16 * 5,
        color: 0xff0044,
        opacity: blurOpacity
      }
    ];

    let maxX: number | undefined;
    let minX: number | undefined;
    let maxY: number | undefined;
    let minY: number | undefined;

    for (const blur of blurs) {
      if (blur.left !== undefined) {
        const v = blur.left;
        if (maxX === undefined || v > maxX) {
          maxX = v;
        }
        if (minX === undefined || v < minX) {
          minX = v;
        }
      }

      if (blur.right !== undefined) {
        const v = width - blur.right;
        if (maxX === undefined || v > maxX) {
          maxX = v;
        }
        if (minX === undefined || v < minX) {
          minX = v;
        }
      }

      if (blur.top !== undefined) {
        const v = blur.top;
        if (maxY === undefined || v > maxY) {
          maxY = v;
        }
        if (minY === undefined || v < minY) {
          minY = v;
        }
      }

      if (blur.bottom !== undefined) {
        const v = height - blur.bottom;
        if (maxY === undefined || v > maxY) {
          maxY = v;
        }
        if (minY === undefined || v < minY) {
          minY = v;
        }
      }
    }

    const canvasWidth = (maxX || 0) - (minX || 0) + blurRadius * 2;
    const canvasHeight = (maxY || 0) - (minY || 0) + blurRadius * 2;
    const canvasOffsetX = -1 * (blurRadius - (minX || 0));
    const canvasOffsetY = -1 * (blurRadius - (minY || 0));

    // Draw blurs.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (const blur of blurs) {
      let x = 0;
      let y = 0;
      if (blur.left !== undefined) {
        x = blur.left;
      }
      if (blur.right !== undefined) {
        x = width - blur.right;
      }
      x += blurRadius - (minX || 0);
      if (blur.top !== undefined) {
        y = blur.top;
      }
      if (blur.bottom !== undefined) {
        y = height - blur.bottom;
      }
      y += blurRadius - (minY || 0);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, blurRadius);

      if (blur.color !== undefined) {
        const opacity = blur.opacity || 0.15;
        gradient.addColorStop(0, `rgba(${hexToRgb(blur.color)}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(blur.color)}, 0)`);

        ctx.fillStyle = gradient;
      }

      ctx.moveTo(x, y);
      ctx.arc(x, y, blurRadius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Insert blur.
    const data = canvas.toDataURL();

    const div = document.createElement('div');
    div.className = elem.className;
    elem.replaceWith(div);

    const inner = document.createElement('div');
    inner.style.position = 'absolute';
    inner.style.top = `${canvasOffsetY}px`;
    inner.style.left = `${canvasOffsetX}px`;
    inner.style.width = `${canvasWidth}px`;
    inner.style.height = `${canvasHeight}px`;
    inner.style.backgroundImage = `url(${data})`;

    div.appendChild(inner);
  }

  function setupBlurBox(elem: HTMLDivElement) {
    renderBlurBox(elem);
  }
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
                <div class="blur-outer-box" use:setupBlurBox>
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
  $blur-color-1 = rgba(#00aaff, 0.1);
  $blur-color-2 = rgba(#6b24ff, 0.1);
  $blur-color-3 = rgba(#ff0044, 0.1);
  $blur-outer-color-1 = rgba(#00aaff, 0.03);
  $blur-outer-color-2 = rgba(#6b24ff, 0.03);
  $blur-outer-color-3 = rgba(#ff0044, 0.03);
  // $blur-color-1 = rgba(#ff0044, 0.5);
  // $blur-color-2 = rgba(#6b24ff, 0.5);
  // $blur-color-3 = rgba(#00aaff, 0.5);

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
