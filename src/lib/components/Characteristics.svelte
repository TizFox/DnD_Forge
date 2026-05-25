<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/baseComponents/Container.svelte";
	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type CharacteristicsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: CharacteristicsPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} grid grid-cols-2 gap-3">
	{#each Object.entries(character.info.characteristics) as [key, value]}
		<AreaInput
			wClass={key === "backstory" ? "col-span-2" : ""}
			title={key.split("_").join(" ")}
			{value}
			onChange={(s: string) => {
				character.info.characteristics[
					key as keyof CharacterType["info"]["characteristics"]
				] = s;
			}}
		/>
	{/each}
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
