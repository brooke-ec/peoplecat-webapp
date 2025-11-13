<script lang="ts">
	import { resize } from "svelte-resize-observer-action";
	import Cache from "$lib/application/cache.svelte";
	import Message from "./Message.svelte";
	import Input from "./Input.svelte";

	let { data } = $props();

	let messages = $derived(Cache.messages.get(data.chat));
	let margin = $state(0);
	let scrollable = false;

	function onResize() {
		const nowScrollable = document.body.scrollHeight > document.body.clientHeight;
		if (!CSS.supports("overflow-anchor", "none") || nowScrollable != scrollable)
			window.scrollTo(0, document.documentElement.scrollHeight);
		scrollable = nowScrollable;
	}
</script>

<div class="container" style:margin-bottom="{margin}px" use:resize={onResize}>
	{#if messages}
		{#each messages as message}
			<Message {message} />
		{/each}
	{:else}
		<p>Loading messages...</p>
	{/if}
	<div class="anchor"></div>
</div>

<Input chat={data.chat} bind:clientHeight={margin} />

<style lang="scss">
	.container {
		flex-direction: column;
		overflow-x: hidden;
		display: flex;
		padding: 10px;
		gap: 10px;

		:global(*) {
			overflow-anchor: none;
		}
	}

	.anchor {
		overflow-anchor: auto;
		height: 1px;
	}
</style>
