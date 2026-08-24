<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";
	import { AbilityEnum, type SkillsType } from "$lib/types";

	import Container from "$lib/components/base/Container.svelte";
	import Value from "$lib/components/base/Value.svelte";

	type PassiveSkillPropsType = {
		wClass?: string;
		character: Character;
		ability: AbilityEnum;
		skill: SkillsType[AbilityEnum];
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
	<h3 class="main-text">{m.character_passive({ skill: m[skill]() })}</h3>
	<Value value={passiveSkill} />
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
