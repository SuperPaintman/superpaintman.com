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
  import Header from '~/components/Header.svelte';
  import HeaderLink from '~/components/HeaderLink.svelte';
  import Footer from '~/components/Footer.svelte';
  import Counters from '~/components/Counters.svelte';
  import LinksPage from './pages/LinksPage.svelte';
  import CVPage from './pages/CVPage.svelte';

  export let url = '';
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

    <Router {url}>
      <Header>
        <HeaderLink to="/">Links</HeaderLink>
        <HeaderLink to="/cv">CV</HeaderLink>
      </Header>

      <main>
        <Route path="/" component={LinksPage} />
        <Route path="/cv" component={CVPage} />
      </main>

      <Footer />
    </Router>
  </Seo>

  <Counters yandex={41936319} google="UA-89780612-1" />
</div>

<style lang="stylus">
  .root {
    overflow: hidden;
  }
</style>
