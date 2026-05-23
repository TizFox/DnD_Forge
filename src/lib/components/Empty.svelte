<script lang="ts">
	import { Frown } from "@lucide/svelte";

	let {
		msg,
	}: {
		msg: string;
	} = $props();
</script>

<!------------------------------------------>

<div class="sad-message">
	<Frown size="100px" class="text-cta" />
	<h1 class="main-text p-std">{msg}</h1>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.sad-message {
		@apply -z-10 absolute top-0 left-0 w-full h-full
		flex justify-center items-center gap-3;
	}
</style>
