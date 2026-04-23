<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type ActionsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: ActionsPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} h-fit flex flex-col gap-3">
	<AreaInput
		title="Actions"
		value={character.info.actions}
		onChange={(s: string) => {
			character.info.actions = s;
		}}
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
