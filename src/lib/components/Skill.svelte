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
			class={"w-1/2 h-5 std-check " + (isSaveThrow ? "invisible" : "")}
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
