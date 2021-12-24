<script lang="ts">
  import { setSeoContext } from './context';
  import SeoApply from './SeoApply.svelte';

  setSeoContext();
</script>

<slot />

<SeoApply />
