export const plugin = {
	name: 'svelte loader',
	async setup(build) {
		const { compile } = await import('svelte/compiler');

		// when a .svelte file is imported...
		build.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
			let generate = 'server';
			if (process.env.MODE === 'client') {
				generate = 'client';
			}
			// read and compile it with the Svelte compiler
			const file = await Bun.file(path).text();
			const contents = compile(file, {
				filename: path,
				generate,
				css: 'injected',
			}).js.code;

			// and return the compiled source code as "js"
			return {
				contents,
				loader: 'js',
			};
		});
	},
};
