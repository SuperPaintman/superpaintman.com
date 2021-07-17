<script lang="ts">
  /*!
   * Copyright (C) 2017-2021 SuperPaintman
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
   */

  import Seo from './Seo.svelte';
  import Counters from './Counters.svelte';
  import Avatar from './Avatar.svelte';
  import Footer from './Footer.svelte';
  import CardList from './CardList.svelte';

  export let locals: Locals;
</script>

<Seo {...locals.seo} />

<div class="container">
  <div class="content">
    <div class="profile">
      <div class="avatar-container">
        <Avatar />
      </div>
      <h1 class="name">
        {locals.content.title}
      </h1>
      <h2 class="subtitle">
        {locals.content.description}
      </h2>
    </div>
    <div class="line" />
    <CardList email={locals.email} links={locals.links} />
  </div>
  <Footer license={locals.footer.license} repo={locals.footer.repo} />
</div>

<Counters {...locals.counters} />

<style lang="stylus">
  @import "./config.styl"

  .content
    @extend $block-shadow

    width: 100%
    max-width: $content_width

    margin: auto
    margin-top: $content_margin_top

    background: $color_white

    color: $color_black

    border-radius: 3px

    @media (max-width: $screen_content_max)
      width: auto

      margin: 0 $content_mobile_margin

    @media (max-width: $screen_md_max)
      margin-top: round($content_margin_top * 0.8)

    @media (max-width: $screen_sm_max)
      margin-top: round($content_margin_top * 0.7)

  .profile
    > .name
      text-align: center
      font-weight: 300

      @media (max-width: $screen_content_max)
        font-size: 1.6em

      @media (max-width: $screen_sm_max)
        font-size: 1.3em

    > .subtitle
      text-align: center
      font-weight: 400
      font-size: 1.2em

      @media (max-width: $screen_content_max)
        font-size: 1em

  .avatar-container
    position: relative

    bottom: (152px / 2) + 5px

    margin-bottom: -1 * @bottom

  .line
    margin-top: 14px
    margin-bottom: 14px

    border-bottom: solid 1px rgba($color_black, 0.1)
</style>
