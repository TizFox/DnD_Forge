<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import NumberInput from "$lib/baseComponents/NumberInput.svelte";
	import CheckboxInput from "$lib/baseComponents/CheckboxInput.svelte";

	type CaPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: CaPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} ca-container">
	<div class="ca-col gap-3">
		<div class="ca-row">
			<NumberInput
				title="initiative"
				value={character.info.initiative}
				onChange={(n: number) => (character.info.initiative = n)}
			/>

			<NumberInput
				title="ca"
				value={character.info.ca +
					(character.info.shield.worn
						? character.info.shield.value
						: 0)}
				onChange={(n: number) => (character.info.ca = n)}
			/>

			<NumberInput
				title="speed"
				value={character.info.speed}
				onChange={(n: number) => (character.info.speed = n)}
			/>
		</div>
		<div class="ca-col">
			<span class="main-text">SHIELD</span>
			<div class="ca-row">
				<NumberInput
					wClass="flex-1"
					value={character.info.shield.value}
					onChange={(n: number) => (character.info.shield.value = n)}
				/>
				<CheckboxInput
					checked={character.info.shield.worn}
					onChange={(b: boolean) => (character.info.shield.worn = b)}
				/>
			</div>
		</div>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.ca-container {
		@apply h-fit p-3 bg-z1
		rounded-xl;
	}

	.ca-col {
		@apply w-full h-full
		flex flex-col items-center justify-center;
	}

	.ca-row {
		@apply w-full h-full
		flex flex-row items-center justify-center gap-1;
	}
</style>
