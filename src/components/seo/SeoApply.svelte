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
  import { getSeoContext } from './context';

  const seo = getSeoContext();

  const title = seo.title;
  const description = seo.description;
  const robots = seo.robots;
  const keywords = seo.keywords;
  const canonical = seo.canonical;
  const themeColor = seo.themeColor;
  const twitter = seo.twitter;
  const openGraph = seo.openGraph;

  $: robotsIndex = $robots.noIndex ? 'noindex' : 'index';
  $: robotsFollow = $robots.noFollow ? 'nofollow' : 'follow';

  $: ogTitle = $openGraph
    ? $openGraph.title || $openGraph.fallback
      ? $title
      : undefined
    : undefined;
  $: ogDescription = $openGraph
    ? $openGraph.description || $openGraph.fallback
      ? $description
      : undefined
    : undefined;
  $: ogUrl = $openGraph
    ? $openGraph.url || $openGraph.fallback
      ? $canonical
      : undefined
    : undefined;

  $: twTitle = $twitter
    ? $twitter.title || $twitter.fallback
      ? $title
      : undefined
    : undefined;
  $: twDescription = $twitter
    ? $twitter.description || $twitter.fallback
      ? $description
      : undefined
    : undefined;
</script>

<svelte:head>
  <!-- Basic -->
  {#if $title}
    {@html `<title>${$title}</title>`}
    <!-- <title>{$title}</title> -->

    <meta name="title" content={$title} />
  {/if}

  {#if $description}
    <meta name="description" content={$description} />
  {/if}

  {#if $keywords && $keywords.length > 0}
    <meta name="keywords" content={$keywords.join(', ')} />
  {/if}

  <meta name="robots" content="{robotsIndex}, {robotsFollow}" />

  {#if $canonical}
    <link rel="canonical" href={$canonical} />
  {/if}

  {#if $themeColor}
    <meta name="theme-color" content={$themeColor} />
  {/if}

  <!-- Open Graph -->
  {#if $openGraph && $openGraph.locale}
    <meta property="og:locale" content={$openGraph.locale} />
  {/if}

  {#if $openGraph && $openGraph.type}
    <meta property="og:type" content={$openGraph.type} />
  {/if}

  {#if ogTitle}
    <meta property="og:title" content={ogTitle} />
  {/if}

  {#if ogDescription}
    <meta property="og:description" content={ogDescription} />
  {/if}

  {#if ogUrl}
    <meta property="og:url" content={ogUrl} />
  {/if}

  {#if $openGraph && $openGraph.siteName}
    <meta property="og:site_name" content={$openGraph.siteName} />
  {/if}

  {#if $openGraph && $openGraph.image}
    {#if $openGraph.image.url}
      <meta property="og:image" content={$openGraph.image.url} />
    {/if}
  {/if}

  <!-- Twitter -->
  {#if $twitter && $twitter.card}
    <meta name="twitter:card" content={$twitter.card} />
  {/if}

  {#if twTitle}
    <meta name="twitter:title" content={twTitle} />
  {/if}

  {#if twDescription}
    <meta name="twitter:description" content={twDescription} />
  {/if}

  {#if $twitter && $twitter.site}
    <meta name="twitter:site" content={$twitter.site} />
  {/if}

  {#if $twitter && $twitter.domain}
    <meta name="twitter:domain" content={$twitter.domain} />
  {/if}

  {#if $twitter && $twitter.image}
    {#if $twitter.image.url}
      <meta name="twitter:image" content={$twitter.image.url} />
    {/if}
  {/if}
</svelte:head>
