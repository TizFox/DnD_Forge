<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesType, SkillsType } from "$lib/types";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
	import Value from "$lib/baseComponents/Value.svelte";

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

<BaseContainer extraClasses="{wClass} flex flex-col">
	<h3 class="main-text">Passive<br />{skill.toUpperCase()}</h3>
	<Value value={passiveSkill} />
</BaseContainer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
