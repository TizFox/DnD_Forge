<script lang="ts">
	type ValuePropsType = {
		wClass?: string;
		rClass?: string;
		pClass?: string;
		title?: string;
		value: number;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		pClass = "px-std",
		title = "",
		value,
	}: ValuePropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex flex-col">
	{#if title !== ""}
		<span class="main-text">{title.toUpperCase()}</span>
	{/if}
	<h3 class="w-full {rClass} {pClass} value">
		{value}
	</h3>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.value {
		@apply h-8 bg-z2
		flex items-center justify-center;
	}
</style>
