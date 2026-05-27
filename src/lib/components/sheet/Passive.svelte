<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import PassiveSkill from "$lib/components/base/PassiveSkill.svelte";
	import type { AbilitiesType, SkillsType } from "$lib/types";

	type PassivePropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: PassivePropsType = $props();

	const chosenSkills: Array<
		{ [Ab in AbilitiesType]: [Ab, SkillsType[Ab]] }[AbilitiesType]
	> = [
		["wisdom", "perception"],
		["wisdom", "insight"],
		["wisdom", "survival"],
		["intelligence", "investigation"],
	];
</script>

<!------------------------------------------>

<div class="{wClass} passive-container">
	{#each chosenSkills as skill}
		<PassiveSkill {character} ability={skill[0]} skill={skill[1]} />
	{/each}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.passive-container {
		@apply grid grid-cols-2 gap-3;
	}
</style>
