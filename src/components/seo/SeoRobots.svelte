<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getSeoContext, noopUnset } from './context';

  export let noIndex: boolean = false;
  export let noFollow: boolean = false;

  const seo = getSeoContext();

  let unset = noopUnset;
  $: {
    unset();
    unset = seo.setRobots({ noIndex, noFollow });
  }

  onDestroy(() => unset());
</script>
