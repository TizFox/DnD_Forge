<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { Sizes } from "$lib/types";

    import { lockInput } from "$lib/global.svelte";

	import TextInput from "$lib/components/base/TextInput.svelte";

	type RacePropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: RacePropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex">
	<TextInput
		bind:value={character.info.race}
		rClass="rounded-l-lg"
		placeholder="Character Race"
	/>
	<select
		bind:value={character.info.size}
		disabled={lockInput()}
		class="race-select"
	>
		{#each Object.values(Sizes) as m}
			<option value={m}>{m.toUpperCase()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.race-select {
		@apply w-min h-8 base-px bg-z2 text-left
		base-border rounded-r-lg
		base-transition
		focus:border-cta
		focus:outline-none
		focus:shadow-none
		disabled:border-z0;
	}
</style>
