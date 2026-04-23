<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type EquipmentPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: EquipmentPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} h-fit flex flex-col gap-3">
	<AreaInput
		title="Equipment"
		value={character.equipment.inventory}
		onChange={(s: string) => {
			character.equipment.inventory = s;
		}}
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
