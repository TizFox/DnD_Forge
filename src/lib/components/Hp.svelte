<script lang="ts">
	import { Heart, Skull } from "@lucide/svelte";

	import { Character } from "$lib/character.svelte";

	import NumberInput from "$lib/baseComponents/NumberInput.svelte";
	import CheckboxInput from "$lib/baseComponents/CheckboxInput.svelte";

	type HpPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: HpPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} hp-container">
	<div class="hp-multi">
		<NumberInput
			title="max hp"
			value={character.hp.max}
			minValue={1}
			onChange={(n: number) => (character.hp.max = n)}
		/>

		<NumberInput
			title="temp hp"
			value={character.hp.temp}
			onChange={(n: number) => (character.hp.temp = n)}
		/>
	</div>

	<NumberInput
		title="current hp"
		value={character.hp.current}
		maxValue={character.hp.max}
		onChange={(n: number) => (character.hp.current = n)}
	/>

	<div class="hp-multi">
		<div class="hp-item">
			<span class="main-text">HIT DICE</span>
			<div class="hp-multi">
				<p
					class="w-full h-8 bg-z2 flex items-center justify-center rounded-lg"
				>
					{character.hp.hitDice.max}
				</p>

				<p class="font-bold">d</p>
				<NumberInput
					value={character.hp.hitDice.type}
					onChange={(n: number) => (character.hp.hitDice.type = n)}
				/>
			</div>
			<NumberInput
				value={character.hp.hitDice.spent}
				maxValue={character.hp.hitDice.max}
				onChange={(n: number) => (character.hp.hitDice.spent = n)}
			></NumberInput>
		</div>

		<div class="hp-item">
			<span class="main-text">DEATH TS</span>
			<div class="hp-multi">
				<Heart class="text-cta" />
				<CheckboxInput
					checked={character.hp.deathTS.success >= 1}
					onChange={(val) => {
						character.hp.deathTS.success = val ? 1 : 0;
					}}
				/>
				<CheckboxInput
					checked={character.hp.deathTS.success >= 2}
					onChange={(val) => {
						character.hp.deathTS.success = val ? 2 : 1;
					}}
				/>
				<CheckboxInput
					checked={character.hp.deathTS.success >= 3}
					onChange={(val) => {
						character.hp.deathTS.success = val ? 3 : 2;
					}}
				/>
			</div>
			<div class="hp-multi">
				<Skull class="text-cta" />
				<CheckboxInput
					checked={character.hp.deathTS.failure >= 1}
					onChange={(val) => {
						character.hp.deathTS.failure = val ? 1 : 0;
					}}
				/>
				<CheckboxInput
					checked={character.hp.deathTS.failure >= 2}
					onChange={(val) => {
						character.hp.deathTS.failure = val ? 2 : 1;
					}}
				/>
				<CheckboxInput
					checked={character.hp.deathTS.failure >= 3}
					onChange={(val) => {
						character.hp.deathTS.failure = val ? 3 : 2;
					}}
				/>
			</div>
		</div>
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

	.hp-multi {
		@apply w-full
		flex flex-row items-center justify-center gap-3;
	}
	.hp-item {
		@apply w-full
		flex flex-col items-center gap-1;
	}
</style>
