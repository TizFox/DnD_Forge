<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import NumberInput from "$lib/baseComponents/NumberInput.svelte";

	type CaPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: CaPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} ca-container">
	<NumberInput
		title="initiative"
		value={character.info.initiative}
		onChange={(n: number) => (character.info.initiative = n)}
	/>
	<NumberInput
		title="ca"
		value={character.info.ca}
		onChange={(n: number) => (character.info.ca = n)}
	/>

	<NumberInput
		title="speed"
		value={character.info.speed}
		onChange={(n: number) => (character.info.speed = n)}
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ca-container {
		@apply h-fit p-3 bg-z1
		flex flex-row items-center justify-center gap-3
		rounded-xl;
	}
</style>
