<script>
  import { getContext } from 'svelte';
  import * as d3 from 'd3';

  const is_ssr = getContext('is_ssr');
  /**
   * @typedef {Object} Props
   * @property {any} data
   * @property {number} [width]
   * @property {number} [height]
   */

  /** @type {Props} */
  let { data, width = 500, height = 500 } = $props();

  let min = d3.min(data, (d) => d.value);
  let max = d3.max(data, (d) => d.value);
  let sum = d3.sum(data, (d) => d.value);

  let stratifier = d3
    .stratify()
    .id((d) => d.id)
    .parentId((d) => d.parentId);
  let stratified = stratifier(data);

  let hierarchy = d3
    .hierarchy(stratified)
    .sum((d) => d.data.value)
    .sort((a, b) => b.value - a.value);

  // Specify the color scale.
  const color = d3.scaleOrdinal(
    data.map((d) => d.id),
    d3.schemeTableau10
  );

  // Specify initial tiling method.
  let tile = $state(d3.treemapSquarify);

  // Compute the layout.
  let root = $derived(
    d3.treemap().tile(tile).size([width, height]).padding(1).round(true)(hierarchy)
  );

  const handleClick = (name, value) => alert(`you selected: ${name} (${value})`);
</script>

{#if !is_ssr}
  <label>
    Tiling method
    <select bind:value={tile}>
      <option value={d3.treemapSquarify}>squarify</option>
      <option value={d3.treemapBinary} selected>binary</option>
      <option value={d3.treemapSliceDice}>slice-dice</option>
      <option value={d3.treemapSlice}>slice</option>
      <option value={d3.treemapDice}>dice</option>
    </select>
  </label>
  ||
{/if}
min: {min} | max: {max} | total: {sum}
{#if is_ssr}|| width: {width} | height: {height}{/if}

<svg {width} {height} viewBox="0 0 {width} {height}">
  {#each root.children as leaf, i}
    {@const cx = leaf.x0 + (leaf.x1 - leaf.x0) / 2}
    {@const cy = leaf.y0 + (leaf.y1 - leaf.y0) / 2}
    {@const name = leaf.data.id}
    {@const value = leaf.data.data.value}
    <g>
      <title>{name}</title>
      <rect
        id="rect-{i}"
        fill={color(name)}
        x={leaf.x0}
        y={leaf.y0}
        width={leaf.x1 - leaf.x0}
        height={leaf.y1 - leaf.y0} />
      <text
        y={cy}
        onclick={(e) => handleClick(name, value)}
        onkeyup={(e) => handleClick(name, value)}
        role="button"
        tabindex="0">
        <tspan x={cx}>{leaf.data.id}</tspan>
        <tspan x={cx} dy="12">({leaf.data.data.value})</tspan>
      </text>
    </g>
  {/each}
</svg>

<style>
  svg {
    max-width: 100%;
    height: auto;
  }

  text,
  tspan {
    text-anchor: middle;
    font-size: 12px;
  }
</style>
