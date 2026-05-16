<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { Sizes } from "$lib/types";

	import TextInput from "$lib/baseComponents/TextInput.svelte";

	type RacePropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: RacePropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex">
	<TextInput
		rClass="rounded-l-lg"
		value={character.info.race}
		placeholder="Character Race"
		onChange={(s: string) => (character.info.race = s)}
	/>
	<select class="race-select" bind:value={character.info.size}>
		{#each Object.values(Sizes) as m}
			<option value={m}>{m.toUpperCase()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.race-select {
		@apply w-min h-8 px-std bg-z2 text-left
		border-2 border-dark rounded-r-lg
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
</style>
