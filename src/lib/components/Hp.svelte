<script lang="ts">
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
		<div class="hp-item">
			<span>Max HP</span>
			<NumberInput
				value={character.hp.max}
				onChange={(n: number) => (character.hp.max = n)}
			/>
		</div>
		<div class="hp-item">
			<span>Temp HP</span>
			<NumberInput
				value={character.hp.temp}
				onChange={(n: number) => (character.hp.temp = n)}
			/>
		</div>
	</div>

	<div class="hp-item">
		<span>Current HP</span>
		<NumberInput
			value={character.hp.current}
			maxValue={character.hp.max}
			onChange={(n: number) => (character.hp.current = n)}
		/>
	</div>

	<div class="hp-multi">
		<div class="hp-item gap-1">
			<span>Hit Die</span>
			<div class="hp-multi">
				<NumberInput
					value={character.hp.hitDice.max}
					maxValue={character.info.level}
					onChange={(n: number) => (character.hp.hitDice.max = n)}
				></NumberInput>
				d
				<NumberInput
					value={character.hp.hitDice.type}
					onChange={(n: number) => (character.hp.hitDice.type = n)}
				></NumberInput>
			</div>
			<NumberInput
				value={character.hp.hitDice.spent}
				maxValue={character.hp.hitDice.max}
				onChange={(n: number) => (character.hp.hitDice.spent = n)}
			></NumberInput>
		</div>

		<div class="hp-item gap-1">
			<span>Death TS</span>
			<div class="hp-multi">
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

	span {
		@apply main-text;
	}

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
		flex flex-col items-center;
	}
</style>
