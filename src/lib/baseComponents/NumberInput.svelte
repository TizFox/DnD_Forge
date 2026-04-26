<script lang="ts">
	type NumberInputPropsType = {
		wClass?: string;
		title?: string;
		minValue?: number;
		value: number;
		maxValue?: number;
		onChange: (n: number) => void;
	};

	let {
		wClass = "w-full",
		title = "",
		minValue = 0,
		value,
		maxValue,
		onChange,
	}: NumberInputPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} number-input-countainer">
	{#if title !== ""}
		<span class="main-text">{title.toUpperCase()}</span>
	{/if}
	<input
		class="number-input no-spinner"
		bind:value
		onchange={() => {
			value = value < minValue ? minValue : value;
			if (maxValue) {
				value = value > maxValue ? maxValue : value;
			}
			if (!value) {
				value = 0;
			}
			onChange(value);
		}}
		type="number"
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.number-input-countainer {
		@apply flex flex-col;
	}

	.number-input {
		@apply w-full h-8 px-3 bg-z2 text-center
		border-2 border-dark rounded-lg
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
	.no-spinner::-webkit-inner-spin-button,
	.no-spinner::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
