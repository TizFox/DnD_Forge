<script lang="ts">
	import { Plus, Minus, X, Divide, Equal, Delete } from "@lucide/svelte";

	import { showKeyboard } from "$lib/global.svelte";

	type NumberInputPropsType = {
		wClass?: string;
		rClass?: string;
		title?: string;
		minValue?: number;
		value: number;
		maxValue?: number;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		title = "",
		minValue = 0,
		value = $bindable(0),
		maxValue,
	}: NumberInputPropsType = $props();

	let lastValue = $state(0); // When error in evaluating expression return to last valid value
	let textInput = $state<string>(String(value));

	const handleChange = () => {
		lastValue = value;

		const input = evalInput() ?? Number(textInput);

		value = isNaN(input) ? lastValue : input;
		value = Math.max(value, minValue);
		value = maxValue ? Math.min(value, maxValue) : value;
		value = Math.floor(value);

		// Update textInput in case of an expression
		textInput = String(value);
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
		if (textInput === "0") {
			textInput = "";
		}
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
		".": () => addToInput("."), //missing (not necessary)
		"(": () => addToInput("("),
		")": () => addToInput(")"),
		del: () => (textInput = textInput.slice(0, textInput.length - 1)),
		enter: () => handleChange(),
	};
</script>

<!------------------------------------------>

<div class="{wClass} relative flex flex-col">
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

	{#if showKeyboard()}
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
							class="col-span-3 std-btn rounded-none"
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

				<button
					onclick={() => keyboard.enter()}
					class="col-span-10 std-btn rounded-none rounded-bl-lg"
				>
					<Equal />
				</button>

				<button
					onclick={() => keyboard.del()}
					class="col-span-4 std-btn p-std rounded-none rounded-br-lg"
				>
					<Delete />
				</button>
			</div>
		</section>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.number-input {
		@apply w-full h-8 px-std bg-z2
		text-center
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
		@apply absolute z-99
		top-full left-1/2 -translate-x-1/2
		w-fit h-fit p-std bg-z2 rounded-xl
		flex justify-center items-center
		border-3 border-z0
		shadow-2xl
		invisible peer-focus:visible;
	}
	.keyboard {
		@apply w-fit h-full
		grid grid-cols-[repeat(14,1rem)]
		auto-rows-fr;
	}
</style>
