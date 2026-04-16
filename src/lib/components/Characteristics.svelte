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

<div class="{wClass} h-fit grid grid-cols-2 gap-5">
	{#each Object.entries(character.info.characteristics) as [key, value]}
		<AreaInput
			wClass={key === "backstory" ? "col-span-2" : ""}
			title={key.split("_").join(" ")}
			{value}
			onChange={(s: string) => {
				character!.info.characteristics[
					key as keyof CharacterType["info"]["characteristics"]
				] = s;
			}}
		/>
	{/each}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
