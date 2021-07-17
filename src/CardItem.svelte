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
