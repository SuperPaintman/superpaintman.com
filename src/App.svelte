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
  import * as qs from 'querystring';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import {
    Seo,
    SeoTitle,
    SeoDescription,
    SeoKeywords,
    SeoCanonical,
    SeoThemeColor,
    SeoTwitter,
    SeoOpenGraph
  } from '~/components/seo';
  import { Layout, LayoutSlot } from '~/components/layout';
  import Header from '~/components/Header.svelte';
  import HeaderLink from '~/components/HeaderLink.svelte';
  import Footer from '~/components/Footer.svelte';
  import Counters from '~/components/Counters.svelte';
  import LinksPage from './pages/LinksPage.svelte';
  import CVPage from './pages/CVPage.svelte';
  import ErrorPage from './pages/ErrorPage.svelte';

  export let url = '';
  export let serverData: ServerData | undefined = undefined;

  const format = writable<string | undefined>(undefined);
  onMount(() => {
    const search = window.location.search;
    if (search.length === 0) {
      return;
    }

    const query = qs.parse(search.slice(1));

    if (typeof query.format === 'string') {
      format.set(query.format);
    } else {
      format.set(undefined);
    }
  });

  let virtualUrl: string;
  $: {
    if (serverData?.error?.code !== undefined) {
      virtualUrl = `/__INTERNAL__/error-page/${serverData.error.code}`;
    } else {
      virtualUrl = url;
    }
  }
</script>

<div class="root">
  <Seo>
    <SeoTitle value="Aleksandr Krivoshchekov (SuperPaintman)" />
    <SeoDescription
      value="Aleksandr Krivoshchekov's (SuperPaintman) personal site."
    />
    <SeoKeywords
      value={[
        'SuperPaintman',
        'Aleksandr Krivoshchekov',
        'Krivoshchekov',
        // Typos, mistakes and aliases
        'Alex Krivoshchekov',
        'Alexander Krivoshchekov',
        'Aleksandr Krivoshhekov',
        'Alex Krivoshhekov',
        'Alexander Krivoshhekov',
        'Александр Кривощеков'
      ]}
    />
    <SeoCanonical value="https://superpaintman.com" />
    <SeoThemeColor value="#ffffff" />
    <SeoTwitter fallback card="summary" site="@SuperPaintman" />
    <SeoOpenGraph
      fallback
      locale="en_US"
      type="website"
      siteName="Aleksandr Krivoshchekov (@SuperPaintman)"
    />

    <Layout>
      <Router url={virtualUrl}>
        <LayoutSlot name="header">
          <div class="header">
            <Header>
              <HeaderLink to="/">Links</HeaderLink>
              <HeaderLink to="/cv">CV</HeaderLink>
            </Header>
          </div>
        </LayoutSlot>

        <main>
          <Route path="/" component={LinksPage} />
          <Route path="/cv" component={CVPage} format={$format} />
          <Route path="/__INTERNAL__/error-page/:code" let:params>
            <ErrorPage code={parseInt(params.code, 10)} />
          </Route>
          <Route path="*">
            <ErrorPage code={404} />
          </Route>
        </main>

        <LayoutSlot name="header">
          <Footer />
        </LayoutSlot>
      </Router>
    </Layout>
  </Seo>

  <Counters yandex={41936319} google="UA-89780612-1" />
</div>

<style lang="stylus">
  .root {
    overflow: hidden;
  }

  .header {
    @media print {
      display: none;
    }
  }
</style>
