<script>
  import { setContext } from 'svelte';
  import Treemap from './Treemap.svelte';
  import data from '../data/data.json';
  $: data.forEach((d) => (d.id !== 'all' ? (d.parentId = 'all') : (d.parentId = null)));
  export let ssr = false;
  setContext('is_ssr', ssr);
  export let width = 500;
  export let height = 500;
  let innerWidth, innerHeight;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if data}
  <Treemap {data} width={ssr ? width : innerWidth} height={ssr ? height : innerHeight} />
{/if}

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
