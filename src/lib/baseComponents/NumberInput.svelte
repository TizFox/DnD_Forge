<script lang="ts">
	type NumberInputPropsType = {
		wClass?: string;
		rClass?: string;
		title?: string;
		minValue?: number;
		value: number;
		maxValue?: number;
		onChange: (n: number) => void;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		title = "",
		minValue = 0,
		value,
		maxValue,
		onChange,
	}: NumberInputPropsType = $props();

	let textInput = $derived<string>(String(value));

	const evalInput = (): number | null => {
		// Check if Input is an expression
		if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(textInput)) {
			return null;
		}

		// Evaluate the expression
		try {
			const result = Function(`"use strict"; return (${textInput})`)();
			return typeof result === "number" && isFinite(result)
				? result
				: null;
		} catch {
			return null;
		}
	};
</script>

<!------------------------------------------>

<div class="{wClass} flex flex-col">
	{#if title !== ""}
		<span class="main-text">{title.toUpperCase()}</span>
	{/if}
	<input
		class="{rClass} number-input no-spinner"
		bind:value={textInput}
		onchange={() => {
			const input = evalInput() ?? Number(textInput);

			value = isNaN(input) ? minValue : input;
			value = value < minValue ? minValue : value;
			if (maxValue) {
				value = value > maxValue ? maxValue : value;
			}
			if (!value) {
				value = 0;
			}

			// "textInput" autoupdates given that is "$derived"
			onChange(value);
		}}
		inputmode="numeric"
		type="text"
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.number-input {
		@apply w-full h-8 px-std bg-z2 text-center
		border-2 border-dark
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
