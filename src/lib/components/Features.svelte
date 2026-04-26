<script lang="ts">
	import type { CharacterType } from "$lib/character.svelte";
	import { Character } from "$lib/character.svelte";

	import AreaInput from "$lib/baseComponents/AreaInput.svelte";

	type FeaturesPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: FeaturesPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} features-container">
	{#each Object.entries(character.features) as [key, value]}
		<AreaInput
			title={key.split("_").join(" ")}
			{value}
			onChange={(s: string) => {
				character.features[key as keyof CharacterType["features"]] = s;
			}}
		/>
	{/each}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.features-container {
		@apply h-fit flex flex-col gap-3;
	}
</style>
