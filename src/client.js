import App from './lib/App.svelte';
import { hydrate } from 'svelte';

const ssr = document.getElementById('svelte-ssr');
const { width, height } = ssr
	? JSON.parse(ssr.textContent)
	: { width: 600, height: 600 };

hydrate(App, {
	target: document.getElementById('graph'),
	props: {
		ssr: false,
		width,
		height,
	},
});
