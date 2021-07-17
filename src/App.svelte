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
