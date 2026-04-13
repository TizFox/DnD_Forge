<script lang="ts">
	import {
		getAbilityProficiency,
		setAbilityProficiency,
		getSkillExpertise,
		getSkillProficiency,
		getSkillValue,
		setSkillExpertise,
		setSkillProficiency,
		getAbilityValue,
		getAbilitySaveThrow,
	} from "$lib/characterHandler";
	import type { Character, AbilitiesEnum, SkillsEnum } from "$lib/types";

	type SkillPropsType = {
		character: Character;
		ability: AbilitiesEnum;
		skill: SkillsEnum[AbilitiesEnum];
		isSaveThrow?: boolean;
	};

	let {
		character,
		ability,
		skill,
		isSaveThrow = false,
	}: SkillPropsType = $props();
	let abilitySelector = $derived({ character, ability });
	let skillSelector = $derived({ character, ability, skill });

	let value = $derived(
		isSaveThrow
			? getAbilitySaveThrow(abilitySelector)
			: getSkillValue(skillSelector),
	);
</script>

<!------------------------------------------>

<div class="skill-container">
	<div class="skill-checks">
		<input
			checked={getSkillExpertise(skillSelector)}
			onchange={(e) =>
				setSkillExpertise(skillSelector, e.currentTarget.checked)}
			type="checkbox"
			class={"w-1/2 h-5 std-check " + (isSaveThrow ? "invisible" : "")}
		/>
		<input
			checked={isSaveThrow
				? getAbilityProficiency(abilitySelector)
				: getSkillProficiency(skillSelector)}
			onchange={(e) =>
				isSaveThrow
					? setAbilityProficiency(
							abilitySelector,
							e.currentTarget.checked,
						)
					: setSkillProficiency(
							skillSelector,
							e.currentTarget.checked,
						)}
			type="checkbox"
			class="w-1/2 h-5 std-check"
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
		@apply w-full h-full flex flex-row items-center gap-2;
	}
	.skill-checks {
		@apply flex-1 flex flex-row items-center gap-0.5;
	}
	.skill-value {
		@apply flex-1 text-center bg-z2 px-2 rounded-lg;
	}
	.skill-text {
		@apply flex-3 text-left;
	}
</style>
