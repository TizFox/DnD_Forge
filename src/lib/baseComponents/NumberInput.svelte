<script lang="ts">
	type NumberInputPropsType = {
		wClass?: string;
		minValue?: number;
		value: number;
		maxValue?: number;
		onChange: (n: number) => void;
	};

	let {
		wClass = "w-full",
		minValue = 0,
		value,
		maxValue,
		onChange,
	}: NumberInputPropsType = $props();
</script>

<!------------------------------------------>

<input
	class="{wClass} number-input no-spinner"
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

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.number-input {
		@apply h-8 px-3 bg-z2 text-center
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
