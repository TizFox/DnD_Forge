<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import type { AbilitiesType, SkillsType } from "$lib/types";

	import Container from "$lib/baseComponents/Container.svelte";
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

<Container extraClasses="{wClass} flex flex-col">
	<h3 class="main-text">Passive<br />{skill.toUpperCase()}</h3>
	<Value value={passiveSkill} />
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
