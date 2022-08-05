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
  const startYear = 2017;
  const currentYear = new Date().getFullYear();
  const yearsRange =
    currentYear === startYear
      ? '' + `${startYear}`
      : `${startYear}-${currentYear}`;

  const license = {
    name: 'Apache License, Version 2.0',
    url: 'https://raw.githubusercontent.com/SuperPaintman/superpaintman.com/master/LICENSE'
  };

  const repo = {
    name: 'SuperPaintman/superpaintman.com',
    url: 'https://github.com/SuperPaintman/superpaintman.com'
  };
</script>

<div class="footer">
  <div class="copyright">
    © {yearsRange} Aleksandr Krivoshchekov (@SuperPaintman)
  </div>
  <div class="license">
    Licensed under the <a
      title={license.name}
      href={license.url}
      target="_blank">{license.name}</a
    >
  </div>
  <div class="repo">
    Found a bug? Fork this site on <a
      title={repo.name}
      href={repo.url}
      target="_blank">GitHub</a
    >
  </div>
</div>

<style lang="stylus">
  .footer {
    margin: 48px auto;

    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }

  .footer a {
    // TODO
    color: inherit;

    text-decoration: none;
  }
</style>
