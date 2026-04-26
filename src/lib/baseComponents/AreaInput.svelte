<script lang="ts">
	type AreaInputPropsType = {
		wClass?: string;
		title?: string;
		value: string;
		onChange: (s: string) => void;
	};

	let {
		wClass = "w-full",
		title = "",
		value,
		onChange,
	}: AreaInputPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} text-container">
	{#if title !== ""}
		<h2 class="main-text">{title.toUpperCase()}</h2>
	{/if}
	<textarea bind:value onchange={() => onChange(value)} class="text-input">
	</textarea>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.text-container {
		@apply p-3 bg-z1
		flex flex-col items-center justify-center gap-1
		rounded-xl;
	}
	.text-input {
		@apply w-full h-full p-3 bg-z2 text-left field-sizing-content
		border-2 border-dark rounded-lg
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
</style>
