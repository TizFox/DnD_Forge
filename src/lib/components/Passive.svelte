<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import PassiveSkill from "$lib/baseComponents/PassiveSkill.svelte";

	type PassivePropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: PassivePropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} passive-container">
	<PassiveSkill {character} ability="wisdom" skill="perception" />
	<PassiveSkill {character} ability="wisdom" skill="insight" />
	<PassiveSkill {character} ability="wisdom" skill="survival" />
	<PassiveSkill {character} ability="dexterity" skill="acrobatics" />
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.passive-container {
		@apply grid grid-cols-2 gap-3;
	}
</style>
