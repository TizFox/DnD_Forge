<script lang="ts">
	import { Plus, Minus, X, Divide, Equal, Delete } from "@lucide/svelte";

	import BaseContainer from "./BaseContainer.svelte";
	import Dice_1 from "@lucide/svelte/icons/dice-1";

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

	const handleChange = () => {
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

		// Weird Cases (?)
		if (isNaN(Number(textInput))) {
			textInput = String(value);
		}
	};

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

	const addToInput = (s: string) => {
		textInput += s;
	};

	const keyboard: Record<string, () => void> = {
		"1": () => addToInput("1"),
		"2": () => addToInput("2"),
		"3": () => addToInput("3"),
		"4": () => addToInput("4"),
		"5": () => addToInput("5"),
		"6": () => addToInput("6"),
		"7": () => addToInput("7"),
		"8": () => addToInput("8"),
		"9": () => addToInput("9"),
		"0": () => addToInput("0"),
		"+": () => addToInput("+"),
		"-": () => addToInput("-"),
		"*": () => addToInput("*"),
		"/": () => addToInput("/"),
		".": () => addToInput("."), //missing
		"(": () => addToInput("("),
		")": () => addToInput(")"),
		del: () => (textInput = textInput.slice(0, textInput.length - 1)),
		enter: () => handleChange(),
	};
</script>

<!------------------------------------------>

<div class="{wClass} flex flex-col">
	{#if title !== ""}
		<span class="main-text">{title.toUpperCase()}</span>
	{/if}
	<input
		class="peer {rClass} number-input no-spinner"
		bind:value={textInput}
		onchange={() => handleChange()}
		onblur={() => handleChange()}
		inputmode="none"
		type="text"
	/>

	<section
		role="presentation"
		onmousedown={(e: MouseEvent) => e.preventDefault()}
		class="keyboard-container"
	>
		<div class="keyboard">
			{#each ["1", "2", "3", 2, "+"] as row1}
				{#if typeof row1 === "number"}
					<div class="col-span-{row1}"></div>
				{:else}
					<button
						onclick={() => keyboard[row1]()}
						class="col-span-3 std-btn rounded-none {row1 === '1'
							? 'rounded-tl-lg'
							: row1 === '3'
								? 'rounded-tr-lg'
								: row1 === '+'
									? 'rounded-t-lg'
									: ''}"
					>
						<h1>
							{#if row1 === "+"}
								<Plus />
							{:else}
								{row1}
							{/if}
						</h1>
					</button>
				{/if}
			{/each}

			{#each ["4", "5", "6", 2, "-"] as row2}
				{#if typeof row2 === "number"}
					<div class="col-span-{row2}"></div>
				{:else}
					<button
						onclick={() => keyboard[row2]()}
						class="col-span-3 std-btn rounded-none"
					>
						<h1>
							{#if row2 === "-"}
								<Minus />
							{:else}
								{row2}
							{/if}
						</h1>
					</button>
				{/if}
			{/each}

			{#each ["7", "8", "9", 2, "*"] as row3}
				{#if typeof row3 === "number"}
					<div class="col-span-{row3}"></div>
				{:else}
					<button
						onclick={() => keyboard[row3]()}
						class="col-span-3 std-btn rounded-none"
					>
						<h1>
							{#if row3 === "*"}
								<X />
							{:else}
								{row3}
							{/if}
						</h1>
					</button>
				{/if}
			{/each}

			{#each ["(", "0", ")", 2, "/"] as row4}
				{#if typeof row4 === "number"}
					<div class="col-span-{row4}"></div>
				{:else}
					<button
						onclick={() => keyboard[row4]()}
						class="col-span-3 std-btn rounded-none {row4 === '('
							? 'rounded-bl-lg'
							: row4 === ')'
								? 'rounded-br-lg'
								: row4 === '/'
									? 'rounded-b-lg'
									: ''}"
					>
						<h1>
							{#if row4 === "/"}
								<Divide />
							{:else}
								{row4}
							{/if}
						</h1>
					</button>
				{/if}
			{/each}

			<div class="col-span-14"></div>

			<button
				onclick={() => keyboard.enter()}
				class="col-span-10 std-btn rounded-none rounded-l-lg"
			>
				<Equal />
			</button>

			<button
				onclick={() => keyboard.del()}
				class="col-span-4 std-btn p-std rounded-none rounded-r-lg"
			>
				<Delete />
			</button>
		</div>
	</section>
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

	.keyboard-container {
		@apply fixed z-99
		bottom-[3%] left-1/2 translate-x-[-50%]
		w-fit h-fit p-double bg-z2 rounded-xl
		flex justify-center items-center
		border-3 border-z0
		shadow-2xl
		invisible peer-focus:visible;
	}
	.keyboard {
		@apply w-fit h-full
		grid grid-cols-14
		auto-rows-fr;
	}
</style>
