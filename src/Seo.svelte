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

  export let title;
  export let robots;
  export let description;
  export let keywords;
  export let canonical;
  export let theme_color;
  export let locale;
  export let type;
  export let url;
  export let site_name;
  export let image;
  export let twitter;

  $: index = robots.index ? 'index' : 'noindex';
  $: follow = robots.follow ? 'follow' : 'nofollow';
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}

  {#if robots}
    <meta name="robots" content="{index}, {follow}" />
  {/if}

  <!-- Basic -->
  {#if title}
    <meta name="title" content={title} />
  {/if}

  {#if description}
    <meta name="description" content={description} />
  {/if}

  {#if keywords}
    <meta name="keywords" content={keywords.join(', ')} />
  {/if}

  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}

  {#if theme_color}
    <meta name="theme-color" content={theme_color} />
  {/if}

  <!-- Open Graph -->
  {#if locale}
    <meta property="og:locale" content={locale} />
  {/if}

  {#if type}
    <meta property="og:type" content={type} />
  {/if}

  {#if title}
    <meta property="og:title" content={title} />
  {/if}

  {#if description}
    <meta property="og:description" content={description} />
  {/if}

  {#if url}
    <meta property="og:url" content={url} />
  {/if}

  {#if site_name}
    <meta property="og:site_name" content={site_name} />
  {/if}

  {#if image}
    <meta property="og:image" content={image} />
  {/if}

  <!-- Twitter -->
  {#if twitter && twitter.card}
    <meta name="twitter:card" content={twitter.card} />
  {/if}

  {#if twitter && twitter.title}
    <meta name="twitter:title" content={twitter.title} />
  {:else if title}
    <meta name="twitter:title" content={title} />
  {/if}

  {#if twitter && twitter.description}
    <meta name="twitter:description" content={twitter.description} />
  {:else if description}
    <meta name="twitter:description" content={description} />
  {/if}

  {#if twitter && twitter.site}
    <meta name="twitter:site" content={twitter.site} />
  {/if}

  {#if site_name}
    <meta name="twitter:domain" content={site_name} />
  {/if}

  {#if twitter && twitter.image}
    <meta name="twitter:image" content={twitter.image} />
  {:else if image}
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>
