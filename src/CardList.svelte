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

  import CardItem from './CardItem.svelte';
  import CardEmail from './CardEmail.svelte';

  export let email = '';
  export let links = [];
</script>

<div class="card-list">
  {#each links as { id, url, title, name } (id)}
    <CardItem {id} {url} {title} username={name} />
  {/each}

  <CardEmail {email} />
</div>
