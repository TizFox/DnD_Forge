<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";

	type CharacteristicsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: CharacteristicsPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} grid grid-cols-2 gap-3">
	<AreaInput
		bind:value={character.info.characteristics.languages}
		wClass="col-span-2"
		title={m.characteristics_laguages()}
	/>
	<AreaInput
		bind:value={character.info.characteristics.personality}
		wClass="col-span-1"
		title={m.characteristics_personality()}
	/>
	<AreaInput
		bind:value={character.info.characteristics.ideals}
		wClass="col-span-1"
		title={m.characteristics_ideals()}
	/>
	<AreaInput
		bind:value={character.info.characteristics.bonds}
		wClass="col-span-1"
		title={m.characteristics_bonds()}
	/>
	<AreaInput
		bind:value={character.info.characteristics.flaws}
		wClass="col-span-1"
		title={m.characteristics_flaws()}
	/>
	<AreaInput
		bind:value={character.info.characteristics.backstory}
		wClass="col-span-2"
		title={m.characteristics_backstory()}
	/>
</Container>



<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
