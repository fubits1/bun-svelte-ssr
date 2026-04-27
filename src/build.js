import { plugin } from './bun/svelte-plugin';

await Bun.build({
	entrypoints: ['./src/client.js'],
	outdir: './dist',
	bundle: true,
	plugins: [plugin],
});
