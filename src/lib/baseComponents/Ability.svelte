<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { ALL_SKILLS, type AbilitiesType } from "$lib/types";

	import Container from "$lib/baseComponents/Container.svelte";
	import NumberInput from "$lib/baseComponents/NumberInput.svelte";
	import Skill from "$lib/baseComponents/Skill.svelte";

	type AbilityPropsType = {
		wClass?: string;
		character: Character;
		ability: AbilitiesType;
	};

	let { wClass = "w-full", character, ability }: AbilityPropsType = $props();

	let value = $derived(character.getAbilityValue(ability));
	let modifier = $derived(character.getAbilityModifier(ability));
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col items-center gap-3">
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
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ability-mod {
		@apply w-fit p-std bg-z2
		text-center rounded-lg;
	}
</style>
