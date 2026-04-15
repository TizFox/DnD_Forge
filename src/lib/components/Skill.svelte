<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesEnum, SkillsEnum } from "$lib/types";

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
		<input
			checked={character.getSkillExpertise(ability, skill)}
			onchange={(e) =>
				character.setSkillExpertise(
					ability,
					skill,
					e.currentTarget.checked,
				)}
			type="checkbox"
			class={"std-check skill-bools " + (isSaveThrow ? "invisible" : "")}
		/>
		<input
			checked={isSaveThrow
				? character.getAbilityProficiency(ability)
				: character.getSkillProficiency(ability, skill)}
			onchange={(e) =>
				isSaveThrow
					? character.setAbilityProficiency(
							ability,
							e.currentTarget.checked,
						)
					: character.setSkillProficiency(
							ability,
							skill,
							e.currentTarget.checked,
						)}
			type="checkbox"
			class="std-check skill-bools"
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
	.skill-bools {
		@apply w-8 h-8;
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
