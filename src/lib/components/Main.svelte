<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet<[]> } = $props();
</script>

<!------------------------------------------>

<main class="main-container">
	<div class="main">
		{@render children()}
	</div>
</main>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.main-container {
		@apply flex justify-center;
	}
	.main {
		@apply relative w-full max-w-7xl min-h-(--main-size) p-5
		flex flex-col items-center gap-5;
	}
</style>
