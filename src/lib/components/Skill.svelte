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

<div class="w-full flex flex-row items-center gap-2">
	<div class="w-fit">
		<input
			checked={getSkillExpertise(skillSelector)}
			onchange={(e) =>
				setSkillExpertise(skillSelector, e.currentTarget.checked)}
			type="checkbox"
			class={isSaveThrow ? "invisible" : ""}
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
		/>
	</div>
	<h3 class="bg-z2 px-2 rounded-lg">
		{value > 0 ? "+" : ""}{value}
	</h3>
	<p class="flex-1 text-left">
		{isSaveThrow
			? "SAVING THROW"
			: skill.toUpperCase().split("_").join(" ")}
	</p>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
