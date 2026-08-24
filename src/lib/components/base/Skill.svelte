<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";
	import { AbilityEnum, SkillEnum, type SkillsType } from "$lib/types";

	import CheckboxInput from "$lib/components/base/CheckboxInput.svelte";
	import Value from "$lib/components/base/Value.svelte";

	type SkillPropsType = {
		character: Character;
		ability: AbilityEnum;
		skill?: SkillsType[AbilityEnum];
		isSaveThrow?: boolean;
	};

	let {
		character,
		ability,
		skill = SkillEnum.Athletics,
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
				bind:checked={character.stats[ability].proficiency}
				visible={false}
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
		{
			isSaveThrow
				? m.skill_saving_throw()
				: m[skill]()
		}
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
