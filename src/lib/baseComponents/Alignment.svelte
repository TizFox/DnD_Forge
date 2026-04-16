<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { Morality, Order } from "$lib/types";

	type AlignmentsPropsType = {
		character: Character;
	};
	let { character }: AlignmentsPropsType = $props();
</script>

<!------------------------------------------>

<div class="alignments-container">
	<select
		bind:value={character.info.alignment.morality}
		class="morality-select"
	>
		{#each Object.values(Morality) as m}
			<option value={m}>{m.toUpperCase()}</option>
		{/each}
	</select>
	<select bind:value={character.info.alignment.order} class="order-select">
		{#each Object.values(Order) as o}
			<option value={o}>{o.toUpperCase()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.alignments-container {
		@apply flex flex-row gap-0;
	}

	.morality-select {
		@apply h-8 bg-z2 text-left px-3 rounded-l-lg;
	}

	.order-select {
		@apply h-8 bg-z2 text-left px-3 rounded-r-lg;
	}
</style>
