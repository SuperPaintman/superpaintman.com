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

  export let id: string;
  export let url: string;
  export let title: string;
  export let username: string;
</script>

<div class="card-item">
  <link rel="prefetch" href={url} />
  <a class="card-content _clearfix -{id}" title={username} href={url}>
    <div class="icon" />
    <div class="title">{title}</div>
  </a>
</div>

<style lang="stylus">
  @import "./config.styl"

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

      &:global(.-habrahabr)
        background-color: $color_habrahabr_bg

        border: solid 1px darken($color_habrahabr_bg, 0.2)

        color: $color_habrahabr_fg

        > .icon
          background-image: url("~images/logo/habrahabr.png?size=64")

      &:global(.-github)
        > .icon
          background-image: url("~images/logo/github.png?size=64")

      &:global(.-vkontakte)
        background-color: $color_vkontakte_bg

        border: solid 1px darken($color_vkontakte_bg, 0.2)

        color: $color_vkontakte_fg

        > .icon
          background-image: url("~images/logo/vkontakte.png?size=64")

      &:global(.-twitter)
        background-color: $color_twitter_bg

        border: solid 1px darken($color_twitter_bg, 0.2)

        color: $color_twitter_fg

        > .icon
          background-image: url("~images/logo/twitter.png?size=64")

      &:global(.-npm)
        background-color: $color_npm_bg

        border: solid 1px darken($color_npm_bg, 0.2)

        color: $color_npm_fg

        > .icon
          background-image: url("~images/logo/npm.png?size=64")

      &:global(.-dockerhub)
        background-color: $color_docker_hub_bg

        color: $color_docker_hub_fg

        > .icon
          background-image: url("~images/logo/docker.png?size=64")

      &:global(.-headhunter)
        background-color: $color_headhunter_bg

        border: solid 1px darken($color_headhunter_bg, 0.2)

        color: $color_headhunter_fg

        > .icon
          background-image: url("~images/logo/headhunter.png?size=64")

      &:global(.-linkedin)
        background-color: $color_linkedin_bg

        border: solid 1px darken($color_linkedin_bg, 0.2)

        color: $color_linkedin_fg

        > .icon
          background-image: url("~images/logo/linkedin.png?size=64")

      &:global(.-medium)
        > .icon
          background-image: url("~images/logo/medium.png?size=64")

      &:global(.-telegram)
        background-color: $color_telegram_bg

        border: solid 1px darken($color_telegram_bg, 0.2)

        color: $color_telegram_fg

        > .icon
          background-image: url("~images/logo/telegram.png?size=64")

      &:global(.-instagram)
        > .icon
          background-image: url("~images/logo/instagram.png?size=64")
</style>
