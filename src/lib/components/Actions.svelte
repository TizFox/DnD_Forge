<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type ActionsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: ActionsPropsType = $props();
</script>

<!------------------------------------------>

<BaseContainer extraClasses={wClass}>
	<AreaInput
		{wClass}
		title="Actions"
		value={character.info.actions}
		onChange={(s: string) => {
			character.info.actions = s;
		}}
	/>
</BaseContainer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
