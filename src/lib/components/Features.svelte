<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type StatsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: StatsPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} h-fit flex flex-col gap-3">
	{#each Object.entries(character.features) as [key, value]}
		<AreaInput
			title={key.split("_").join(" ")}
			{value}
			onChange={(s: string) => {
				character!.features[key as keyof CharacterType["features"]] = s;
			}}
		/>
	{/each}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
