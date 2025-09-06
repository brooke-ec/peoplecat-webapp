<script lang="ts">
	import { application } from "$lib/application/application.svelte";
	import { isIos } from "@melt-ui/svelte/internal/helpers";
	import Settings from "$lib/application/settings.svelte";
	import { browser, dev } from "$app/environment";
	import Loading from "./Loading.svelte";
	import Toaster from "./Toaster.svelte";
	import Freeze from "./Freeze.svelte";

	let { children } = $props();

	import "greset";
	import "$lib/style.scss";

	if (browser) {
		application.connect();

		// @ts-ignore
		if (dev) window.application = application;
	}
</script>

<div data-sveltekit-replacestate={isIos()} style:--bottom-spacing="{Settings.spacing.value}px">
	<Toaster />
	<Loading />
	<Freeze />

	<main>
		{@render children()}
	</main>
</div>

<style lang="scss">
	main {
		flex-direction: column;
		display: flex;
	}
</style>
