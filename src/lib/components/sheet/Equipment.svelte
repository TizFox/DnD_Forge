<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { CoinEnum } from "$lib/types";
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";

	type EquipmentPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: EquipmentPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col gap-3">
	<AreaInput
		bind:value={character.equipment.inventory}
		title={m.equipment_inventory()}
	/>

	<div class="flex justify-between gap-1">
		{#each Object.values(CoinEnum) as coin}
			<NumberInput
				bind:value={character.equipment.coins[coin]}
				title={m[coin]()}
			/>
		{/each}
	</div>

	<AreaInput
		bind:value={character.equipment.proficiencies}
		title={m.equipment_proficiencies()}
	/>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
