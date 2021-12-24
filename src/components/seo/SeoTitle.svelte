<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getSeoContext, noopUnset } from './context';

  export let value: string;

  const seo = getSeoContext();

  let unset = noopUnset;
  $: {
    unset();
    unset = seo.setTitle(value);
  }

  onDestroy(() => unset());
</script>
