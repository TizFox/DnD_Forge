<script lang="ts">
	import { ALL_ABILITIES } from "$lib/types";
	import { Character } from "$lib/character.svelte";
	import { getSpellNames } from "$lib/spells";

	import Container from "$lib/components/base/Container.svelte";
	import Value from "$lib/components/base/Value.svelte";
	import TextInput from "$lib/components/base/TextInput.svelte";
	import Spell from "$lib/components/base/Spell.svelte";
	import SpellSlot from "$lib/components/base/SpellSlot.svelte";

	type SpellcastingInfoPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: SpellcastingInfoPropsType = $props();

	let spellBonus = $derived(character.getSpellcastingModifier());
	let spellDC = $derived(character.getSpellcastingDC());

	let spells = $derived(character.getSpellList());
	let spellLevels = $derived(
		[...new Set(spells.map((s) => s.level))].filter((l) => l != 0).sort(),
	);

	let newSpellName = $state("");
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col gap-3">
	<h2 class="main-text">SPELLCASTING</h2>
	<div class="flex gap-2">
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
		<Value wClass="flex-1" title="spell bonus" value={spellBonus} />
		<Value wClass="flex-1" title="spell dc" value={spellDC} />
	</div>

	<div class="flex flex-col gap-1">
		<div class="flex">
			<TextInput
				wClass="flex-2"
				rClass="rounded-l-lg"
				bind:value={newSpellName}
				placeholder="New Spell Name"
				suggestions={{ id: "spellList", options: getSpellNames() }}
			/>
			<button
				onclick={() => {
					if (character.addSpell(newSpellName)) {
						newSpellName = "";
					}
				}}
				disabled={newSpellName === ""}
				class="std-btn flex-1 h-8 rounded-l-none"
			>
				ADD
			</button>
		</div>

		{#if spellLevels.length > 0}
			<hr class="my-3" />

			<div class="grid grid-cols-3 gap-1">
				{#each spellLevels as level}
					<SpellSlot {character} {level} />
				{/each}
			</div>
		{/if}

		{#if spells.length > 0}
			<hr class="my-3" />
		{/if}
		{#each spells as spell}
			<Spell {character} {spell} />
		{:else}
			<h3 class="main-text">NO SPELLS</h3>
		{/each}
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spellcasting-ability-select {
		@apply flex-1 h-8 px-std bg-z2 text-left
			border-2 border-dark rounded-lg
			transition-std
			focus:border-cta
			focus:outline-none
			focus:shadow-none;
	}
</style>
