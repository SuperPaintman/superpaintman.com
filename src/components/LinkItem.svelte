<!--!
 * Copyright (C) 2017-2022 Aleksandr Krivoshchekov <SuperPaintmanDeveloper@gmail.com>
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
  // import { protectEmailAlways } from 'protect-email';
  import Splash from '~/components/Splash.svelte';

  export let name: string;
  export let url: string;
  export let title: string;
  export let splashOffsetX: number = 0;
  export let isEmail = false;

  type SplashType = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    color?: number;
    opacity?: number;
  };

  const linkSplashOpacity = 0.03;
  const linkSplashRadius = 128 * 1.5;
  const linkSplashes: SplashType[] = [
    {
      top: 16,
      left: 16 * 4,
      color: 0x00aaff,
      opacity: linkSplashOpacity
    },
    {
      top: 48 + 16,
      // bottom: -16,
      right: 16 * 16,
      color: 0x6b24ff,
      opacity: linkSplashOpacity
    },
    {
      top: 48 - 16,
      // bottom: 16,
      right: 16 * 5,
      color: 0xff0044,
      opacity: linkSplashOpacity
    }
  ];
  const linkSplashesActive = linkSplashes.map((splash) => ({
    ...splash,
    opacity: 0.06
  }));
  const linkSplashesBorder = linkSplashes.map((splash) => {
    const res = {
      ...splash,
      opacity: 0.25
    };

    if (splash.top) {
      res.top = splash.top + 2;
    }
    if (splash.bottom) {
      res.bottom = splash.bottom + 2;
    }
    if (splash.left) {
      res.left = splash.left + 2;
    }
    if (splash.right) {
      res.right = splash.right + 2;
    }

    return res;
  });

  const href = isEmail ? `mailto:${url}` : url;
</script>

<svelte:head>
  {#if !isEmail}
    <link rel="prefetch" href={url} />
  {/if}
</svelte:head>

<a class="root" {href} {title} target={isEmail ? undefined : '_blank'}>
  <div class="splash" style={`left: ${splashOffsetX}px`}>
    <Splash splashes={linkSplashes} radius={linkSplashRadius} resizable />

    <div class="active">
      <Splash
        splashes={linkSplashesActive}
        radius={linkSplashRadius}
        resizable
      />
    </div>
  </div>

  <div class="border">
    <Splash splashes={linkSplashesBorder} radius={linkSplashRadius} resizable />
  </div>

  <div class="inner">
    <div>{name}</div>
  </div>
</a>

<style lang="stylus">
  $border = 2px;
  $border-radius = 6px;

  .root {
    display: block;
    position: relative;

    margin-bottom: 16px;

    border-radius: $border-radius;

    color: inherit;
    // color: #ffffff;
    font-size: 16px;
    // font-weight: 700;
    line-height: 16px;
    text-decoration: none;
  }

  .inner {
    position: relative;

    padding: 16px 32px;

    // background-color: #000000;
    background-color: #ffffff;

    border-radius: $border-radius;

    overflow: hidden;
  }

  .border {
    position: absolute;

    top: -1 * $border;
    left: -1 * $border;

    width: 100%;
    height: 100%;

    padding: $border;

    border-radius: $border-radius;

    overflow: hidden;

    opacity: 0.3;

    transition: opacity 0.03s linear;
  }

  .root:hover .border,
  .root:focus .border {
    opacity: 1;
  }

  .splash {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -1;
  }

  .active {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0;

    transition: opacity 0.25s linear;
  }

  .root:hover .active,
  .root:focus .active {
    opacity: 1;
  }
</style>
