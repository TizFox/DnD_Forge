<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { ALL_ABILITIES } from "$lib/types";

	type SpellcastingAbilityPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: SpellcastingAbilityPropsType =
		$props();
</script>

<!------------------------------------------>

<div class="{wClass} alignments-container">
	<select
		class="ability-select"
		bind:value={character.magic.spellcastingAbility}
	>
		{#each ALL_ABILITIES as a}
			<option value={a}>{a.toUpperCase()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.alignments-container {
		@apply flex flex-row;
	}

	.ability-select {
		@apply flex-1 h-8 px-3 bg-z2 text-left
		border-2 border-dark rounded-lg
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
</style>
