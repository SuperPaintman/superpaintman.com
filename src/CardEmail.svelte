<script>
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

  export let email = '';

  $: protectedEmail = protectEmailAlways(email);
  $: href = `mailto:${protectedEmail}`;

  const dangerousContent = (href, title) =>
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
