<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";

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
	<AreaInput title="equipment" bind:value={character.equipment.inventory} />

	<div class="flex justify-between gap-1">
		{#each coinNames as c}
			<NumberInput title={c} bind:value={character.equipment.coins[c]} />
		{/each}
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
