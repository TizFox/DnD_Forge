<script lang="ts">
	import type { Snippet } from "svelte";

	import logo from "$lib/assets/logo1000.png";
	import { getPath } from "$lib/global.svelte";

	let { children = undefined }: { children?: Snippet<[]> } = $props();
</script>

<!------------------------------------------>

<header class="bar-container">
	<div class="bar">
		<a href={getPath()} class="h-full">
			<img src={logo} alt="Logo" class="h-full" />
		</a>

		<div class="user-actions">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</header>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.user-actions {
		@apply w-full h-full
		flex items-center justify-end gap-5;
	}
</style>
