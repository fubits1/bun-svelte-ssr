// also see https://github.com/buhrmi/bun-plugin-svelte

import { plugin } from 'bun';
import { plugin as svelte } from './svelte-plugin.js';

await plugin(svelte);
