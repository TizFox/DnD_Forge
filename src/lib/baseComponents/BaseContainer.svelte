<script lang="ts">
	import type { Snippet } from "svelte";

	type BaseContainerPropsType = {
		children: Snippet;
		extraClasses?: string;
	};

	let { children, extraClasses = "" }: BaseContainerPropsType = $props();
</script>

<!------------------------------------------>

<div class="h-fit p-std bg-z1 rounded-xl {extraClasses}">
	{@render children()}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
