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

  import { protectEmailAlways } from 'protect-email';

  export let email: string;

  $: protectedEmail = protectEmailAlways(email);
  $: href = `mailto:${protectedEmail}`;

  const dangerousContent = (href: string, title: string) =>
    `
      <a class="card-content _clearfix -email" title="${title}" href="${href}">
        <div class="icon"></div>
        <div class="title">
          <span class="full">${title}</span>
          <span class="mobile">Email</span>
        </div>
      </a>
    `;
</script>

<div class="card-item">
  {@html dangerousContent(href, protectedEmail)}
</div>

<style lang="stylus">
  @import "./config.styl"

  :global
    .card-item
      margin: 14px 0

      &:first-child
        margin-top: 0

      &:last-child
        margin-bottom: 0

      > .card-content
        display: block

        margin: 0
        padding: 0

        background-image: url("~images/card-bg.png")
        background-color: $color_white

        color: $color_black

        text-decoration: none

        border-radius: 2px
        border: solid 1px rgba($color_black, 0.2)

        overflow: hidden

        cursor: pointer

        &:hover,
        &:focus
          > .icon
            transform: scale(1.1)

        > .title
          margin-left: 8px

          line-height: $card_icon_size + $card_icon_margin * 2

          float: left

        > .icon
          width: $card_icon_size
          height: $card_icon_size

          margin: $card_icon_margin

          background-size: contain
          background-repeat: no-repeat
          background-position: center

          transition: transform 0.1s linear

          float: left

        &.-email
          background-color: $color_email_bg

          border: solid 1px darken($color_email_bg, 0.2)

          color: $color_email_fg

          > .icon
            background-image: url("~images/logo/email.png?size=64")

          > .title
            > .full
              display: inline

              @media (max-width: $screen_sm_max)
                display: none

            > .mobile
              display: none

              @media (max-width: $screen_sm_max)
                display: inline
</style>
