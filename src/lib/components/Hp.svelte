<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import NumberInput from "$lib/baseComponents/NumberInput.svelte";

	type StatsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: StatsPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} hp-container">
	<div class="hp-couple">
		<div class="hp-item">
			<span class="main-text">Max HP</span>
			<NumberInput
				value={character.hp.max}
				onChange={(n: number) => (character.hp.max = n)}
			/>
		</div>
		<div class="hp-item">
			<span class="main-text">Temporary HP</span>
			<NumberInput
				value={character.hp.temp}
				onChange={(n: number) => (character.hp.temp = n)}
			/>
		</div>
	</div>

	<div class="hp-item">
		<span class="main-text">Current HP</span>
		<NumberInput
			value={character.hp.current}
			maxValue={character.hp.max}
			onChange={(n: number) => (character.hp.current = n)}
		/>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.hp-container {
		@apply h-fit p-3 bg-z1
		flex flex-col items-center justify-center gap-3
		rounded-xl;
	}

	.hp-couple {
		@apply w-full
		flex flex-row items-center justify-center gap-3;
	}
	.hp-item {
		@apply w-full
		flex flex-col items-center;
	}
</style>
