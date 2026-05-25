<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/baseComponents/Container.svelte";
	import AreaInput from "$lib/baseComponents/AreaInput.svelte";
	import NumberInput from "$lib/baseComponents/NumberInput.svelte";

	type EquipmentPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: EquipmentPropsType = $props();

	const coinNames = $derived(
		Object.keys(character.equipment.coins) as Array<
			keyof CharacterType["equipment"]["coins"]
		>,
	);
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col gap-3">
	<AreaInput
		title="equipment"
		value={character.equipment.inventory}
		onChange={(s: string) => {
			character.equipment.inventory = s;
		}}
	/>

	<div class="flex justify-between gap-1">
		{#each coinNames as c}
			<NumberInput
				title={c}
				value={character.equipment.coins[c]}
				onChange={(n: number) => (character.equipment.coins[c] = n)}
			/>
		{/each}
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
