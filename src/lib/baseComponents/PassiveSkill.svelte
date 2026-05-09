<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesType, SkillsType } from "$lib/types";

	import Value from "./Value.svelte";

	type PassiveSkillPropsType = {
		wClass?: string;
		character: Character;
		ability: AbilitiesType;
		skill: SkillsType[AbilitiesType];
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

<div class="{wClass} passive-skill-container">
	<h3 class="main-text">Passive<br />{skill.toUpperCase()}</h3>
	<Value value={passiveSkill} />
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.passive-skill-container {
		@apply base-container
		flex flex-col items-center justify-center;
	}
</style>
