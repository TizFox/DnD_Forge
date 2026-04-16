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
	<div class="ca-item">
		<span class="main-text">Initiative</span>
		<NumberInput
			value={character.info.initiative}
			onChange={(n: number) => (character.info.initiative = n)}
		/>
	</div>
	<div class="ca-item">
		<span class="main-text">CA</span>
		<NumberInput
			value={character.info.ca}
			onChange={(n: number) => (character.info.ca = n)}
		/>
	</div>

	<div class="ca-item">
		<span class="main-text">Speed</span>
		<NumberInput
			value={character.info.speed}
			onChange={(n: number) => (character.info.speed = n)}
		/>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ca-container {
		@apply h-fit p-3 bg-z1
		flex flex-row items-center justify-center gap-3
		rounded-xl;
	}
	.ca-item {
		@apply w-full
		flex flex-col items-center;
	}
</style>
