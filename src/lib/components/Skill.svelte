<script lang="ts">
	import {
		getSkillExpertise,
		getSkillProficiency,
		getSkillValue,
		setSkillExpertise,
		setSkillProficiency,
	} from "$lib/characterHandler";
	import type { Character, AbilitiesEnum, SkillsEnum } from "$lib/types";

	type SkillPropsType = {
		character: Character;
		ability: AbilitiesEnum;
		skill: SkillsEnum[AbilitiesEnum];
	};

	let { character, ability, skill }: SkillPropsType = $props();
	let skillSelector = $derived({ character, ability, skill });

	let value = $derived(getSkillValue(skillSelector));
</script>

<!------------------------------------------>

<div class="flex flex-row items-center justify-between gap-3">
	<div class="flex-1">
		<input
			checked={getSkillExpertise(skillSelector)}
			onchange={(e) =>
				setSkillExpertise(skillSelector, e.currentTarget.checked)}
			type="checkbox"
		/>
		<input
			checked={getSkillProficiency(skillSelector)}
			onchange={(e) =>
				setSkillProficiency(skillSelector, e.currentTarget.checked)}
			type="checkbox"
		/>
	</div>
	<h2 class="flex-2 text-left">{value > 0 ? "+" : ""}{value}</h2>
	<p class="flex-2 text-left">{skill.toUpperCase().split("_").join(" ")}</p>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
