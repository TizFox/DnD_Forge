<script lang="ts">
	import type { Snippet } from "svelte";

	type ContainerPropsType = {
		children: Snippet;
		extraClasses?: string;
	};

	let { children, extraClasses = "" }: ContainerPropsType = $props();
</script>

<!------------------------------------------>

<div class="h-fit base-p bg-z1 rounded-xl {extraClasses}">
	{@render children()}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
