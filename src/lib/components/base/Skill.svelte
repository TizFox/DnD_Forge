<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesType, SkillsType } from "$lib/types";

	import CheckboxInput from "$lib/components/base/CheckboxInput.svelte";
	import Value from "$lib/components/base/Value.svelte";

	type SkillPropsType = {
		character: Character;
		ability: AbilitiesType;
		skill?: SkillsType[AbilitiesType];
		isSaveThrow?: boolean;
	};

	let {
		character,
		ability,
		skill = "athletics",
		isSaveThrow = false,
	}: SkillPropsType = $props();

	let value = $derived(
		isSaveThrow
			? character.getAbilitySaveThrow(ability)
			: character.getSkillValue(ability, skill),
	);
</script>

<!------------------------------------------>

<div class="skill-container">
	<div class="skill-checks">
		{#if isSaveThrow}
			<CheckboxInput
				visible={false}
				bind:checked={character.stats[ability].proficiency}
			/>
			<CheckboxInput
				bind:checked={character.stats[ability].proficiency}
			/>
		{:else}
			<CheckboxInput
				bind:checked={character.stats[ability].skills[skill].expertise}
			/>
			<CheckboxInput
				bind:checked={
					character.stats[ability].skills[skill].proficiency
				}
			/>
		{/if}
	</div>

	<Value wClass="flex-1" {value} />

	<p class="skill-text">
		{isSaveThrow
			? "SAVING THROW"
			: skill.toUpperCase().split("_").join(" ")}
	</p>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.skill-container {
		@apply w-full h-full
		flex items-center gap-2;
	}
	.skill-checks {
		@apply flex-1
		flex items-center gap-0.5;
	}
	.skill-text {
		@apply flex-3 text-left;
	}
</style>
