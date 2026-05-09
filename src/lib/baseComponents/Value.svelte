<script lang="ts">
	type ValuePropsType = {
		wClass?: string;
		pClass?: string;
		value: number;
	};

	let {
		wClass = "w-full",
		pClass = "px-3",
		value,
	}: ValuePropsType = $props();
</script>

<!------------------------------------------>

<h3 class="{wClass} {pClass} value">
	{value}
</h3>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.value {
		@apply h-8 bg-z2
		flex items-center justify-center
		rounded-lg;
	}
</style>
