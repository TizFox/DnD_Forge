<script lang="ts">
	import type { Character, AbilitiesEnum } from "$lib/types";
	import { ALL_SKILLS } from "$lib/types";

	import {
		getAbilityValue,
		getAbilityModifier,
		getAbilitySaveThrow,
		getAbilityProficiency,
		setAbilityProficiency,
	} from "$lib/characterHandler";

	import Skill from "./Skill.svelte";

	type AbilityPropsType = {
		character: Character;
		ability: AbilitiesEnum;
	};
	let { character, ability }: AbilityPropsType = $props();

	let abilitySelector = $derived({ character, ability });

	let value = $derived(getAbilityValue(abilitySelector));
	let modifier = $derived(getAbilityModifier(abilitySelector));
	let saveThrow = $derived(getAbilitySaveThrow(abilitySelector));
</script>

<!------------------------------------------>

<div class="ability-container">
	<div class="ability-info">
		<h2 class="main-text">{ability.toUpperCase()}</h2>
		<h1 class="bg-z2 text-center w-fit p-3 rounded-lg">
			{modifier > 0 ? "+" : ""}{modifier}
		</h1>
		<input
			bind:value={character.stats[ability].value}
			class="no-spinner w-1/4 bg-z2 text-center px-3 rounded-lg"
			defaultValue={value}
			type="number"
		/>

		<Skill {character} {ability} skill="" isSaveThrow={true} />

		{#if ALL_SKILLS[ability].length > 0}
			<hr />

			{#each ALL_SKILLS[ability] as skill}
				<Skill {character} {ability} {skill} />
			{/each}
		{/if}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ability-container {
		@apply bg-z1 w-full flex p-3
		flex-col items-center justify-center gap-3
		rounded-xl;
	}

	.ability-info {
		@apply flex flex-col items-center justify-center gap-2;
	}
</style>
