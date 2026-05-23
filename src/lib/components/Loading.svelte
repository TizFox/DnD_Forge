<script lang="ts">
	import { LoaderCircle } from "@lucide/svelte";
</script>

<!------------------------------------------>

<div class="loading-message">
	<LoaderCircle size="100px" class="text-cta animate-spin" />
	<h1 class="main-text p-std">Loading...</h1>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.loading-message {
		@apply -z-10 absolute top-0 left-0 w-full h-full
		flex justify-center items-center gap-3;
	}
</style>
