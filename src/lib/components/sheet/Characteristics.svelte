<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";

	type CharacteristicsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: CharacteristicsPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} grid grid-cols-2 gap-3">
	{#each Object.keys(character.info.characteristics) as key}
		<AreaInput
			wClass={key === "backstory" ? "col-span-2" : ""}
			title={key.split("_").join(" ")}
			bind:value={
				character.info.characteristics[
					key as keyof CharacterType["info"]["characteristics"]
				]
			}
		/>
	{/each}
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
