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
  import { onDestroy } from 'svelte';
  import { getSeoContext, noopUnset } from './context';

  export let value: string[];

  const seo = getSeoContext();

  let unset = noopUnset;
  $: {
    unset();
    unset = seo.setKeywords(value);
  }

  onDestroy(() => unset());
</script>
