<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { getSpellNames } from "$lib/spells";

	import SpellcastingAbility from "$lib/baseComponents/SpellcastingAbility.svelte";
	import TextInput from "$lib/baseComponents/TextInput.svelte";
	import Spell from "$lib/baseComponents/Spell.svelte";

	type SpellcastingInfoPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: SpellcastingInfoPropsType = $props();

	let spellBonus = $derived(character.getSpellcastingModifier());
	let spellDC = $derived(character.getSpellcastingDC());

	let newSpellName = $state("");
</script>

<!------------------------------------------>

<div class="{wClass} spellcasting-container">
	<h2 class="main-text">SPELLCASTING</h2>
	<div class="spellcasting-info">
		<div class="flex-2">
			<h3 class="main-text">ABILITY</h3>
			<SpellcastingAbility {character} />
		</div>
		<div class="flex-1">
			<h3 class="main-text">SPELL BONUS</h3>
			<h3 class="spellcasting-value">{spellBonus}</h3>
		</div>
		<div class="flex-1">
			<h3 class="main-text">SPELL DC</h3>
			<h3 class="spellcasting-value">{spellDC}</h3>
		</div>
	</div>
	<div class="spellcasting-add">
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
		{#each character.getSpellList() as spell}
			<Spell {character} {spell} />
		{:else}
			<h3 class="main-text">No Spells</h3>
		{/each}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spellcasting-container {
		@apply h-full p-3 bg-z1
		flex flex-col gap-2
		rounded-xl;
	}

	.spellcasting-add {
		@apply flex flex-row gap-2;
	}

	.spellcasting-info {
		@apply flex flex-row gap-2;

		.spellcasting-value {
			@apply w-full h-8 p-2 bg-z2
			flex items-center justify-center
			rounded-lg;
		}
	}

	.spellcasting-spells {
		@apply flex flex-col gap-1;
	}
</style>
