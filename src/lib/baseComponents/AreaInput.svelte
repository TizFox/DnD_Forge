<script lang="ts">
	type AreaInputPropsType = {
		wClass?: string;
		rClass?: string;
		title?: string;
		value: string;
		onChange: (s: string) => void;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		title = "",
		value,
		onChange,
	}: AreaInputPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} area-container">
	{#if title !== ""}
		<h2 class="main-text">{title.toUpperCase()}</h2>
	{/if}
	<textarea
		bind:value
		onchange={() => onChange(value)}
		class="{rClass} area-input"
	>
	</textarea>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.area-container {
		@apply base-container
		flex flex-col items-center justify-center gap-1;
	}
	.area-input {
		@apply w-full h-full p-3 bg-z2 text-left field-sizing-content
		border-2 border-dark
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
</style>
