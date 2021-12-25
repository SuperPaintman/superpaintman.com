<script lang="ts">
  import { Link } from 'svelte-routing';

  export let to: string;
</script>

<li class="root"><Link {to}><slot /></Link></li>

<style lang="stylus">
  .root {
    margin: 0;
    padding: 13px 22px;

    border-radius: 4px;

    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
  }

  .root :global(a) {
    color: inherit;
    text-decoration: none;
  }
</style>
