<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";

	type FeaturesPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: FeaturesPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col gap-3">
	{#each Object.entries(character.features) as [key, value]}
		<AreaInput
			title={key.split("_").join(" ")}
			{value}
			onChange={(s: string) => {
				character.features[key as keyof CharacterType["features"]] = s;
			}}
		/>
	{/each}
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
