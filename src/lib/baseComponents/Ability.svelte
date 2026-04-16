<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesEnum } from "$lib/types";
	import { ALL_SKILLS } from "$lib/types";

	import Skill from "./Skill.svelte";

	type AbilityPropsType = {
		character: Character;
		ability: AbilitiesEnum;
	};
	let { character, ability }: AbilityPropsType = $props();

	let value = $derived(character.getAbilityValue(ability));
	let modifier = $derived(character.getAbilityModifier(ability));
</script>

<!------------------------------------------>

<div class="ability-container">
	<h2 class="main-text">{ability.toUpperCase()}</h2>
	<h1 class="ability-mod">
		{modifier > 0 ? "+" : ""}{modifier}
	</h1>
	<input
		bind:value={character.stats[ability].value}
		class="ability-value no-spinner"
		defaultValue={value}
		type="number"
	/>

	<Skill {character} {ability} isSaveThrow={true} />

	{#if ALL_SKILLS[ability].length > 0}
		<hr />
		{#each ALL_SKILLS[ability] as skill}
			<Skill {character} {ability} {skill} />
		{/each}
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ability-container {
		@apply w-full p-3 bg-z1
		flex flex-col items-center justify-center gap-3
		rounded-xl;
	}

	.ability-mod {
		@apply w-fit p-3 bg-z2
		text-center rounded-lg;
	}
	.ability-value {
		@apply w-1/4 h-8 bg-z2
		text-center rounded-lg;
	}
</style>
