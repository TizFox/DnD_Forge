<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

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

<div class="{wClass} equipment-container">
	<AreaInput
		title="equipment"
		value={character.equipment.inventory}
		onChange={(s: string) => {
			character.equipment.inventory = s;
		}}
	/>

	<div class="coins-container">
		{#each coinNames as c}
			<div class="coin">
				<h3 class="main-text">{c.toUpperCase()}</h3>
				<NumberInput
					value={character.equipment.coins[c]}
					onChange={(n: number) => (character.equipment.coins[c] = n)}
				/>
			</div>
		{/each}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.equipment-container {
		@apply h-fit pb-3 bg-z1
		flex flex-col items-center justify-center
		rounded-xl;
	}

	.coins-container {
		@apply w-full px-3
		flex flex-row gap-1;

		.coin {
			@apply w-full flex flex-col;
		}
	}
</style>
