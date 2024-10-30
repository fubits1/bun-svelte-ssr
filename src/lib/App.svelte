<script>
  import { run } from 'svelte/legacy';

  import { setContext } from 'svelte';
  import Treemap from './Treemap.svelte';
  import data from '../data/data.json';
  // run(() => {
  data.forEach((d) => (d.id !== 'all' ? (d.parentId = 'all') : (d.parentId = null)));
  // });
  /**
   * @typedef {Object} Props
   * @property {boolean} [ssr]
   * @property {number} [width]
   * @property {number} [height]
   */

  /** @type {Props} */
  let { ssr = false, width = 500, height = 500 } = $props();

  setContext('is_ssr', ssr);

  let innerWidth = $state();
  let innerHeight = $state();
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
