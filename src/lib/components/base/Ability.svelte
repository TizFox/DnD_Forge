<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";
	import { AbilityEnum, ABILITY_SKILLS } from "$lib/types";

	import Container from "$lib/components/base/Container.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import Skill from "$lib/components/base/Skill.svelte";

	type AbilityPropsType = {
		wClass?: string;
		character: Character;
		ability: AbilityEnum;
	};

	let { wClass = "w-full", character, ability }: AbilityPropsType = $props();

	let value = $derived(character.getAbilityValue(ability));
	let modifier = $derived(character.getAbilityModifier(ability));
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col items-center gap-3">
	<h2 class="main-text">{m[ability]()}</h2>

	<h1 class="ability-mod main-text">
		{modifier > 0 ? "+" : ""}{modifier}
	</h1>

	<NumberInput
		bind:value={character.stats[ability].value}
		minValue={1}
		wClass="w-1/4"
	/>

	<Skill {character} {ability} isSaveThrow={true} />

	{#if ABILITY_SKILLS[ability].length > 0}
		<hr />
		{#each ABILITY_SKILLS[ability] as skill}
			<Skill {character} {ability} {skill} />
		{/each}
	{/if}
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ability-mod {
		@apply w-fit base-p bg-z2
		text-center rounded-lg;
	}
</style>
