<script lang="ts">
  import { getSeoContext } from './context';

  const seo = getSeoContext();

  const title = seo.title;
  const description = seo.description;
</script>

<svelte:head>
  {#if $title}
    {@html `<title>${$title}</title>`}
    <!-- <title>{$title}</title> -->
  {/if}

  {#if $description}
    <meta name="description" content={$description} />
  {/if}
</svelte:head>
