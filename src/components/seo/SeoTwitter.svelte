<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getSeoContext, noopUnset } from './context';

  export let fallback: boolean = false;
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let image:
    | {
        url?: string;
        alt?: string;
      }
    | undefined = undefined;
  export let card: string | undefined = undefined;
  export let site: string | undefined = undefined;
  export let domain: string | undefined = undefined;

  const seo = getSeoContext();

  let unset = noopUnset;
  $: {
    unset();
    unset = seo.setTwitter({
      fallback,
      title,
      description,
      image,
      card,
      site,
      domain
    });
  }

  onDestroy(() => unset());
</script>
