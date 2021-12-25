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
  import {
    SeoTitle,
    SeoDescription,
    SeoKeywords,
    SeoCanonical
  } from '~/components/seo';
  import { LayoutDisableSlot } from '~/components/layout';
  import CVHeader from '~/components/CVHeader.svelte';
  import * as cv from '~/content/cv';
  import SeoRobots from '~/components/seo/SeoRobots.svelte';

  export let format: string | undefined;

  const months: { [key: number]: string } = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };
  function formatDateRange(
    start: cv.PositionDate,
    end?: cv.PositionDate
  ): string {
    let res = months[start.month] + ' ' + start.year;
    res += ' – ';

    if (end) {
      res += months[end.month] + ' ' + end.year;
    } else {
      res += 'Present';
    }

    return res;
  }

  function formatDuration(
    start: cv.PositionDate,
    end: cv.PositionDate
  ): string {
    const startMonts = start.year * 12 + start.month;
    const endMonts = end.year * 12 + end.month;

    const duration = endMonts - startMonts + 1;

    const years = Math.floor(duration / 12);
    const months = duration % 12;

    let res = '';
    if (years > 0) {
      res += years + ' yr';
      if (years > 1) {
        res += 's';
      }
    }

    if (months > 0) {
      if (res.length > 0) {
        res += ' ';
      }

      res += months + ' mo';
      if (months > 1) {
        res += 's';
      }
    }

    return res;
  }
</script>

<SeoTitle value="Aleksandr Krivoshchekov (SuperPaintman) - CV / Resume" />
<SeoDescription value={cv.seoDescription} />
<SeoKeywords value={['CV', 'Resume']} />
<SeoCanonical value="https://superpaintman.com/cv" />

{#if format === 'pdf'}
  <SeoRobots noIndex />

  <LayoutDisableSlot name="header" />
  <LayoutDisableSlot name="footer" />
{/if}

<div class="root" class:pdf={format === 'pdf'}>
  <CVHeader {format} />

  <div class="divider" />

  <div id="bio" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Bio</h3>
      </div>

      <div class="right-side">
        <div class="description">
          {@html cv.description}
        </div>
      </div>
    </div>
  </div>

  <div class="divider" />

  <div id="experience" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Experience</h3>
      </div>

      <div class="right-side">
        {#each cv.positions as { title, company, location, date, progress, description }}
          <div class="position">
            <div class="dot" />
            {#if progress}
              <div class="line" />
            {/if}
            <h4 class="title">{title}</h4>
            <div class="info">
              <span class="company">
                {#if company.url}<a href={company.url} target="_blank"
                    >{company.name}</a
                  >{:else}{company.name}{/if}</span
              >{#if location},{/if}
              {#if location}
                <span class="location">{location}</span>
              {/if}
            </div>
            <div class="date">
              <span class="range">{formatDateRange(date.start, date.end)}</span>
              {#if date.end}
                <span class="duration"
                  >{formatDuration(date.start, date.end)}</span
                >
              {/if}
            </div>

            {#if description}
              <div class="description">
                {@html description}
              </div>
            {/if}

            <div class="position-divider" />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="divider" />

  <div id="languages" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Languages</h3>
      </div>

      <div class="right-side">
        <ul class="languages">
          {#each cv.languages as { name, level } (name)}
            <li class="language">
              <span class="name">{name}</span>
              <span class="level">({level})</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="divider" />

  <div id="skills" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Skills</h3>
      </div>

      <div class="right-side">
        <ul class="skills">
          {#each cv.skills as skill (skill)}
            <li class="skill">{skill}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  {#if format !== 'pdf'}
    <div class="divider" />
  {/if}
</div>

<style lang="stylus">
  $divider-color = rgba(0, 0, 0, 0.1);
  $position-dot-color = rgba(200, 200, 200, 1);
  $position-dot-color = rgba(160, 160, 160, 1);
  $position-gap-height = 58px;
  $left-side-width = 128px + 32px;

  .root {
    @media print {
      // PDF breaks sometimes.
      font-family: sans-serif;
    }
  }

  .root.pdf {
    // PDF breaks sometimes.
    font-family: sans-serif;

    margin: 48px 0;
  }

  .divider {
    margin: 32px 0;

    border-bottom: 1px solid $divider-color;

    @media (max-width: 896px) {
      margin: 20px 0;
    }

    @media (max-width: 512px) {
      margin: 16px 0;
    }
  }

  .section {
    max-width: 1200px;

    margin: auto;
  }

  .section .left-side {
    font-size: 1em;
    line-height: 1.5;
  }

  .section .right-side {
    font-size: 1em;
    line-height: 1.5;
  }

  .section .description {
    :global {
      p {
        margin: 0;
        margin-bottom: 16px;
      }

      p:last-child {
        margin-bottom: 0;
      }

      a {
        color: inherit;

        text-decoration: none;
      }

      ul {
        padding: 0;
        margin: 0;
        margin-bottom: 16px;

        list-style: none;
      }

      ul:last-child {
        margin-bottom: 0;
      }

      li {
        position: relative;

        margin-left: 32px;
        margin-bottom: 6px;
      }

      li:last-child {
        margin-bottom: 0;
      }

      li:before {
        content: "∙";

        position: absolute;

        width: 32px;

        top: -1px;
        left: -32px;

        text-align: center;
      }
    }
  }

  .container {
    display: flex;

    margin: 32px 32px;

    @media (max-width: 896px) {
      display: block;

      margin: 20px 32px + (12px - floor(7px / 2) - 1px) * 2;
    }

    @media (max-width: 512px) {
      margin: 16px 32px;
    }
  }

  .left-side {
    flex: 0 0 auto;

    width: $left-side-width;

    @media (max-width: 896px) {
      width: 0;

      margin-bottom: 16px;
    }

    @media (max-width: 512px) {
      margin-bottom: 10px;
    }
  }

  .right-side {
    flex: 0 1 auto;

    width: 100%;

    margin-right: $left-side-width;

    @media (max-width: 896px) {
      margin-right: 0;
    }
  }

  .section-title {
    margin: 0;
    margin-right: 48px;
    padding: 0;

    font-size: 16px;
    font-weight: 700;
    text-align: right;

    @media (max-width: 896px) {
      margin-right: 0;

      text-align: left;
    }
  }

  .skills {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    width: 100%;

    padding: 0;
    margin: 0;
    margin-bottom: -8px;

    list-style: none;
  }

  .skills > .skill {
    display: block;

    flex: 0 0 auto;

    // width: 33.33%;
    width: 25%;

    padding-right: 16px;
    margin-bottom: 8px;

    box-sizing: border-box;

    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 400px) {
      width: 100%;
    }
  }

  .root.pdf .skills > .skill {
    width: 33.33%;
  }

  .languages {
    padding: 0;
    margin: 0;

    list-style: none;
  }

  .language {
    margin-bottom: 8px;
  }

  .language:last-child {
    margin-bottom: 0;
  }

  .language > .name {
    margin-right: 8px;
  }

  .position {
    position: relative;

    margin-bottom: $position-gap-height;

    @media (max-width: 512px) {
      margin-bottom: 42px;
    }
  }

  .position:last-child {
    margin-bottom: 0;
  }

  .position .dot {
    position: absolute;

    width: 7px;
    height: @width;

    top: 12px - floor(@width / 2) - 1px;
    left: -24px - floor(@width / 2) - 1px;

    // background: $position-dot-color;
    background: #ffffff;

    border: 1px solid $position-dot-color;
    border-radius: 50%;

    z-index: 1;

    @media (max-width: 512px) {
      left: -16px - floor(@width / 2) - 1px;
    }
  }

  .position .line {
    position: absolute;

    width: 1px;
    height: "calc(100% + %s)" % ($position-gap-height + 5px);

    top: 12px;
    left: -24px;

    background: $position-dot-color;

    @media (max-width: 512px) {
      height: "calc(100% + %s)" % (42px + 5px);

      left: -16px;
    }
  }

  .position .title {
    padding: 0;
    margin: 0;

    // font-size: 18px;
    font-size: 22px;
    font-weight: 400;
    line-height: 24px;

    @media (max-width: 512px) {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
    }
  }

  .position .info {
    margin-top: 6px;

    line-height: 24px;
  }

  .position .info a {
    color: inherit;
    text-decoration: none;
  }

  .position .date {
    margin-top: 4px;
    margin-bottom: 16px;

    // font-size: 14px;
    font-weight: 300;
    line-height: 24px;
  }

  .position .date:last-child {
    margin-bottom: 0;
  }

  .position .date .duration:before {
    content: "∙";

    position: relative;

    margin: 0 8px;

    top: -2px;

    font-size: 12px;

    color: rgba(0, 0, 0, 0.5);
  }

  .position .position-divider {
    position: absolute;

    width: 100%;
    height: $position-gap-height;

    bottom: -1 * @height + 2px;

    color: $position-dot-color;
    font-size: 12px;
    text-align: center;
    line-height: @height;

    @media (max-width: 512px) {
      height: 42px;

      bottom: -1 * @height + 2px;

      line-height: @height;
    }
  }

  .position:last-child .position-divider {
    display: none;
  }

  .position .position-divider:before {
    content: "∙ ∙ ∙";
  }
</style>
