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
