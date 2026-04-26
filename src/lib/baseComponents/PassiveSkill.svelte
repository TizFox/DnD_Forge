<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesEnum, SkillsEnum } from "$lib/types";

	type PassiveSkillPropsType = {
		wClass?: string;
		character: Character;
		ability: AbilitiesEnum;
		skill: SkillsEnum[AbilitiesEnum];
	};

	let {
		wClass = "w-full",
		character,
		ability,
		skill,
	}: PassiveSkillPropsType = $props();

	let passiveSkill = $derived(character.getPassiveSkillValue(ability, skill));
</script>

<!------------------------------------------>

<div class="{wClass} ps-container">
	<h3 class="main-text">Passive<br />{skill.toUpperCase()}</h3>
	<h3 class="ps-value">{passiveSkill}</h3>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ps-container {
		@apply h-fit p-3 bg-z1
		flex flex-col items-center justify-center
		rounded-xl;
	}

	.ps-value {
		@apply w-full h-8 p-2 bg-z2
		flex items-center justify-center
		rounded-lg;
	}
</style>
