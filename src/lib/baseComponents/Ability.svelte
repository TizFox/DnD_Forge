<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { ALL_SKILLS, type AbilitiesType } from "$lib/types";

	import NumberInput from "./NumberInput.svelte";
	import Skill from "./Skill.svelte";

	type AbilityPropsType = {
		character: Character;
		ability: AbilitiesType;
	};

	let { character, ability }: AbilityPropsType = $props();

	let value = $derived(character.getAbilityValue(ability));
	let modifier = $derived(character.getAbilityModifier(ability));
</script>

<!------------------------------------------>

<div class="ability-container">
	<h2 class="main-text">{ability.toUpperCase()}</h2>

	<h1 class="ability-mod main-text">
		{modifier > 0 ? "+" : ""}{modifier}
	</h1>

	<NumberInput
		wClass="w-1/4"
		minValue={1}
		{value}
		onChange={(n: number) => (character.stats[ability].value = n)}
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
		@apply w-full base-container
		flex flex-col items-center justify-center gap-3;
	}

	.ability-mod {
		@apply w-fit p-3 bg-z2
		text-center rounded-lg;
	}
</style>
