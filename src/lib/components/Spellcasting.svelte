<script lang="ts">
	import { ALL_ABILITIES } from "$lib/types";
	import { Character } from "$lib/character.svelte";
	import { getSpellNames } from "$lib/spells";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
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

<BaseContainer extraClasses="{wClass} flex flex-col gap-3">
	<h2 class="main-text">SPELLCASTING</h2>
	<div class="spellcasting-info">
		<div class="flex-2">
			<h3 class="main-text">ABILITY</h3>
			<div class="{wClass} flex">
				<select
					class="spellcasting-ability-select"
					bind:value={character.magic.spellcastingAbility}
				>
					{#each ALL_ABILITIES as a}
						<option value={a}>{a.toUpperCase()}</option>
					{/each}
				</select>
			</div>
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
	<div class="flex">
		<TextInput
			wClass="flex-2"
			rClass="rounded-l-lg"
			value={newSpellName}
			placeholder="New Spell Name"
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
			disabled={newSpellName === ""}
			class="std-btn rounded-l-none flex-1"
		>
			ADD
		</button>
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
</BaseContainer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spellcasting-info {
		@apply flex gap-2;

		.spellcasting-ability-select {
			@apply flex-1 h-8 px-std bg-z2 text-left
			border-2 border-dark rounded-lg
			transition-std
			focus:border-cta
			focus:outline-none
			focus:shadow-none;
		}
	}

	.spellcasting-spells {
		@apply flex flex-col gap-1;
	}
</style>
