<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import type { Character } from "$lib/character.svelte";

	import NumberInput from "$lib/components/base/NumberInput.svelte";

	type SpellSlotPropsType = {
		wClass?: string;
		character: Character;
		level: number;
	};

	let { wClass = "w-full", character, level }: SpellSlotPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} spell-slot-container">
	<h3 class="main-text">
		{m.spellslot_level({ level })}
	</h3>
	<p class="spell-slot-input">
		<span class="text-right">{m.spellslot_total()}:</span>
		<NumberInput
			bind:value={character.magic.spellSlots[level - 1].total}
			wClass="col-span-2"
		/>
	</p>
	<p class="spell-slot-input">
		<span class="text-right">{m.spellslot_used()}:</span>
		<NumberInput
			bind:value={character.magic.spellSlots[level - 1].used}
			maxValue={character.magic.spellSlots[level - 1].total}
			wClass="col-span-2"
		/>
	</p>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spell-slot-container {
		@apply bg-z2 base-p
		flex flex-col gap-1
		rounded-lg;
	}

	.spell-slot-input {
		@apply flex-1 grid grid-cols-3 gap-1;
	}
</style>
