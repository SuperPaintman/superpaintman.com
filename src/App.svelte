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
  import Footer from '~/components/Footer.svelte';
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
      <Header />

      <main>
        <Route path="/" component={LinksPage} />
        <Route path="/cv" component={CVPage} />
      </main>

      <Footer />
    </Router>
  </Seo>
</div>

<style lang="stylus">
  .root {
    overflow: hidden;
  }
</style>
