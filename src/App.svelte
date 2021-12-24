<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import { Seo, SeoTitle, SeoDescription } from '~/components/seo';
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
