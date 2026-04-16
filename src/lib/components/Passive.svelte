<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import PassiveSkill from "$lib/baseComponents/PassiveSkill.svelte";

	type StatsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: StatsPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} grid grid-cols-2 gap-3">
	<PassiveSkill {character} ability="wisdom" skill="perception" />
	<PassiveSkill {character} ability="wisdom" skill="insight" />
	<PassiveSkill {character} ability="wisdom" skill="survival" />
	<PassiveSkill {character} ability="dexterity" skill="acrobatics" />
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
