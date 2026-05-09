<script lang="ts">
	import type { Character } from "$lib/character.svelte";

	import NumberInput from "$lib/baseComponents/NumberInput.svelte";

	type SpellSlotPropsType = {
		wClass?: string;
		character: Character;
		level: number;
	};

	let { wClass = "w-full", character, level }: SpellSlotPropsType = $props();
</script>

<!------------------------------------------>

{#if level !== 0}
	<div class="{wClass} spell-slot-container">
		<h3 class="main-text">
			SLOT LV. {level}
		</h3>
		<p class="spell-slot-input">
			<span class="text-right">TOT:</span>
			<NumberInput
				wClass="col-span-2"
				value={character.magic.spellSlots[level - 1].total}
				onChange={(n: number) => {
					character.magic.spellSlots[level - 1].total = n;
				}}
			/>
		</p>
		<p class="spell-slot-input">
			<span class="text-right">USED:</span>
			<NumberInput
				wClass="col-span-2"
				value={character.magic.spellSlots[level - 1].used}
				maxValue={character.magic.spellSlots[level - 1].total}
				onChange={(n: number) => {
					character.magic.spellSlots[level - 1].used = n;
				}}
			/>
		</p>
	</div>
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spell-slot-container {
		@apply bg-z2 p-3
		flex flex-col gap-1
		rounded-lg;
	}

	.spell-slot-input {
		@apply flex-1 grid grid-cols-3;
	}
</style>
