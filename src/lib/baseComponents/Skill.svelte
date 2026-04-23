<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesEnum, SkillsEnum } from "$lib/types";

	import CheckboxInput from "./CheckboxInput.svelte";

	type SkillPropsType = {
		character: Character;
		ability: AbilitiesEnum;
		skill?: SkillsEnum[AbilitiesEnum];
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
		<CheckboxInput
			visible={!isSaveThrow}
			checked={character.getSkillExpertise(ability, skill)}
			onChange={(val) => character.setSkillExpertise(ability, skill, val)}
		/>
		<CheckboxInput
			checked={isSaveThrow
				? character.getAbilityProficiency(ability)
				: character.getSkillProficiency(ability, skill)}
			onChange={(val) =>
				isSaveThrow
					? character.setAbilityProficiency(ability, val)
					: character.setSkillProficiency(ability, skill, val)}
		/>
	</div>

	<h3 class="skill-value">
		{value > 0 ? "+" : ""}{value}
	</h3>

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
		flex flex-row items-center gap-2;
	}
	.skill-checks {
		@apply flex-1
		flex flex-row items-center gap-0.5;
	}
	.skill-value {
		@apply flex-1 h-8 px-2 bg-z2
		flex items-center justify-center
		rounded-lg;
	}
	.skill-text {
		@apply flex-3 text-left;
	}
</style>
