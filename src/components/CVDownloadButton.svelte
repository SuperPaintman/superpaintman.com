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
  import Splash from '~/components/Splash.svelte';

  export let href: string;
  export let title: string | undefined = undefined;
  export let target: string | undefined = undefined;

  type SplashType = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    color?: number;
    opacity?: number;
  };

  const linkSplashOpacity = 0.25;
  const linkSplashRadius = 64 * 1.5;
  const linkSplashesBorder: SplashType[] = [
    {
      top: 0,
      left: 0,
      color: 0xff0044,
      opacity: linkSplashOpacity
    },
    {
      top: 16 * 4,
      left: 16 * 6,
      color: 0x6b24ff,
      opacity: linkSplashOpacity
    },
    {
      top: 16,
      right: 0,
      color: 0x00aaff,
      opacity: linkSplashOpacity
    }
  ];
</script>

<a class="root" {href} {title} {target}>
  <div class="border">
    <Splash splashes={linkSplashesBorder} radius={linkSplashRadius} resizable />
  </div>

  <div class="inner">
    <slot />
  </div>
</a>

<style lang="stylus">
  $border = 2px;

  .root {
    display: inline-block;
    position: relative;

    border-radius: 4px;

    color: inherit;
    font-size: 16px;
    line-height: 16px;
    text-decoration: none;
  }

  .inner {
    position: relative;

    padding: 12px 20px;

    background-color: #ffffff;

    overflow: hidden;
  }

  .border {
    position: absolute;

    top: -1 * $border;
    left: -1 * $border;

    width: 100%;
    height: 100%;

    padding: $border;

    border-radius: 4px;

    overflow: hidden;

    opacity: 0.5;

    transition: opacity 0.03s linear;
  }

  .root:hover .border,
  .root:focus .border {
    opacity: 1;
  }
</style>
