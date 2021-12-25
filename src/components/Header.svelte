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
  import { links } from 'svelte-routing';
  import Splash from '~/components/Splash.svelte';

  const splashOpacity = 0.15;
  const splashRadius = 192 * 1.5;
  const splashes = [
    {
      top: 0,
      left: 48,
      color: 0xff0044,
      opacity: splashOpacity
    },
    {
      top: 0 + 32 * 5,
      left: 48 + 32 * 4,
      color: 0x6b24ff,
      opacity: splashOpacity
    },
    {
      top: 0 + 32 * 2,
      left: 48 + 32 * 10,
      color: 0x00aaff,
      opacity: splashOpacity
    }
  ];
</script>

<nav class="header">
  <div class="container">
    <div class="splash">
      <Splash {splashes} radius={splashRadius} />
    </div>

    <a class="logo" href="/" use:links>
      <div class="icon">AK</div>
    </a>

    <ol class="links">
      <slot />
    </ol>
  </div>
</nav>

<style lang="stylus">
  .container {
    position: relative;
    display: flex;

    max-width: 1200px;

    margin: 16px auto;
    padding: 0 32px;

    box-sizing: border-box;

    @media (max-width: 512px) {
      padding: 0 16px;
    }
  }

  .splash {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -1;
  }

  .logo {
    display: block;

    color: inherit;
    text-decoration: none;
  }

  .icon {
    flex: 0 0 auto;

    width: 42px;
    height: 42px;

    margin-right: 16px;

    border-radius: 4px;

    background: #000000;

    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    line-height: @height;

    user-select: none;
  }

  .links {
    flex: 0 1 auto;

    display: flex;

    margin: 0;
    margin-left: auto;
    margin-right: -22px;
    padding: 0;

    list-style: none;

    @media (max-width: 512px) {
      margin-right: -16px;
    }
  }
</style>
