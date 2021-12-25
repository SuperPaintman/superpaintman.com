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
  import { onDestroy } from 'svelte';
  import { getSeoContext, noopUnset } from './context';

  export let fallback: boolean = false;
  export let locale: string | undefined = undefined;
  export let type: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let url: string | undefined = undefined;
  export let siteName: string | undefined = undefined;
  export let image:
    | {
        url?: string;
        alt?: string;
        width?: number;
        heigth?: number;
      }
    | undefined = undefined;
  export let article:
    | {
        publishedTime?: string;
        modifiedTime?: string;
        expirationTime?: string;
        section?: string;
        author?: string;
        tags?: string[];
      }
    | undefined = undefined;

  const seo = getSeoContext();

  let unset = noopUnset;
  $: {
    unset();
    unset = seo.setOpenGraph({
      fallback,
      locale,
      type,
      title,
      description,
      url,
      siteName,
      image,
      article
    });
  }

  onDestroy(() => unset());
</script>
