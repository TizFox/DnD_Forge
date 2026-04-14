<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { ALL_ABILITIES } from "$lib/types";

	import Ability from "$lib/components/Ability.svelte";

	type StatsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-fit", character }: StatsPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex flex-col items-center gap-5">
	{#each ALL_ABILITIES as ability}
		<Ability {character} {ability} />
	{/each}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
