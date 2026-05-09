<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { getSpellNames } from "$lib/spells";

	import SpellAbility from "$lib/baseComponents/SpellAbility.svelte";
	import Value from "$lib/baseComponents/Value.svelte";
	import TextInput from "$lib/baseComponents/TextInput.svelte";
	import Spell from "$lib/baseComponents/Spell.svelte";
	import SpellSlot from "$lib/baseComponents/SpellSlot.svelte";

	type SpellcastingInfoPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: SpellcastingInfoPropsType = $props();

	let spellBonus = $derived(character.getSpellcastingModifier());
	let spellDC = $derived(character.getSpellcastingDC());

	let spells = $derived(character.getSpellList());
	let spellLevels = $derived([...new Set(spells.map((s) => s.level))].sort());

	let newSpellName = $state("");
</script>

<!------------------------------------------>

<div class="{wClass} spellcasting-container">
	<h2 class="main-text">SPELLCASTING</h2>
	<div class="spellcasting-info">
		<div class="flex-2">
			<h3 class="main-text">ABILITY</h3>
			<SpellAbility {character} />
		</div>
		<div class="flex-1">
			<h3 class="main-text">SPELL BONUS</h3>
			<Value value={spellBonus} />
		</div>
		<div class="flex-1">
			<h3 class="main-text">SPELL DC</h3>
			<Value value={spellDC} />
		</div>
	</div>
	<div class="spellcasting-new">
		<h3 class="main-text flex-1">NEW SPELL NAME</h3>
		<TextInput
			wClass="flex-2"
			value={newSpellName}
			suggestions={{ id: "spellList", options: getSpellNames() }}
			onChange={(s: string) => {
				newSpellName = s;
			}}
		/>
		<button
			onclick={() => {
				if (character.addSpell(newSpellName)) {
					newSpellName = "";
				}
			}}
			class="std-btn flex-1">ADD</button
		>
	</div>
	<div class="spellcasting-spells">
		{#if spellLevels.length > 0}
			<hr class="my-3" />
			<div class="grid grid-cols-3 gap-1">
				{#each spellLevels as level}
					<SpellSlot {character} {level} />
				{/each}
			</div>

			<hr class="my-3" />
		{/if}

		{#each spells as spell}
			<Spell {character} {spell} />
		{:else}
			<h3 class="main-text">NO SPELLS</h3>
		{/each}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spellcasting-container {
		@apply base-container
		flex flex-col gap-2;
	}

	.spellcasting-new {
		@apply flex flex-row gap-2;
	}

	.spellcasting-info {
		@apply flex flex-row gap-2;
	}

	.spellcasting-spells {
		@apply flex flex-col gap-1;
	}
</style>
