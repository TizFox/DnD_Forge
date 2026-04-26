<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type ActionsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: ActionsPropsType = $props();
</script>

<!------------------------------------------>

<AreaInput
	{wClass}
	title="Actions"
	value={character.info.actions}
	onChange={(s: string) => {
		character.info.actions = s;
	}}
/>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
