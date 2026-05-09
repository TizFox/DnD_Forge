<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { Morality, Order } from "$lib/types";

	type AlignmentPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: AlignmentPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex">
	<select
		class="morality-select"
		bind:value={character.info.alignment.morality}
	>
		{#each Object.values(Morality) as m}
			<option value={m}>{m.toUpperCase()}</option>
		{/each}
	</select>
	<select class="order-select" bind:value={character.info.alignment.order}>
		{#each Object.values(Order) as o}
			<option value={o}>{o.toUpperCase()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	select {
		@apply flex-1 h-8 px-3 bg-z2 text-left
		border-2 border-dark
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;

		&.morality-select {
			@apply rounded-l-lg;
		}
		&.order-select {
			@apply rounded-r-lg;
		}
	}
</style>
