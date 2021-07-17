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

  type Repo = {
    name: string;
    url: string;
  };

  type License = {
    text: string;
    url: string;
  };

  export let repo: Repo;
  export let license: License;

  const currentYear = new Date().getFullYear();
  const yearsRange =
    currentYear === 2017 ? '' + `${currentYear}` : `2017-${currentYear}`;
</script>

<footer class="footer">
  <div class="wrapper">
    <div class="copyright">© {yearsRange} SuperPaintman</div>
    <div class="license">
      <span>Licensed under the{' '}</span>
      <a title={license.text} href={license.url} target="_blank">
        {license.text}
      </a>
    </div>
    <div class="repo">
      <span>
        {'Found a bug? Fork this site on '}
      </span>
      <a title={repo.name} href={repo.url} target="_blank">
        {repo.name}
      </a>
    </div>
  </div>
</footer>

<style lang="stylus">
  @import "./config.styl"

  .footer
    > .wrapper
      margin: 6px 14px
      padding: 6px 14px

      text-align: center
      font-size: 0.8em
      line-height: 2em
</style>
