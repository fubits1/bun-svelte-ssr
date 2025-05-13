import { plugin } from 'bun';
import { plugin as svelte } from './svelte-plugin.js';

await plugin(svelte);
