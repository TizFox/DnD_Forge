<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import TextInput from "$lib/baseComponents/TextInput.svelte";
	import NumberInput from "$lib/baseComponents/NumberInput.svelte";
	import Alignment from "$lib/baseComponents/Alignment.svelte";

	type InfoPropsType = {
		character: Character;
	};

	let { character }: InfoPropsType = $props();

	let proficiencyBonus = $derived(character.getProficiencyBonus());
</script>

<!------------------------------------------>

<div class="info-container">
	<div class="info-section">
		<div class="info-subsection">
			<h3>NAME</h3>
			<span>
				<TextInput
					value={character.info.name}
					onChange={(s: string) => (character.info.name = s)}
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>PLAYER</h3>
			<span>
				<TextInput
					value={character.info.player}
					onChange={(s: string) => (character.info.player = s)}
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>LEVEL</h3>
			<span>
				<NumberInput
					minValue={1}
					value={character.info.level}
					onChange={(n: number) => {
						character.info.level = n;
						character.hp.hitDice.max = n;
					}}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>P.BONUS</h3>
			<span>
				<p
					class="w-full h-8 bg-z2 flex items-center justify-center px-3 rounded-lg"
				>
					{proficiencyBonus}
				</p>
			</span>
		</div>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3>BACKGROUND</h3>
			<span>
				<TextInput
					value={character.info.background}
					onChange={(s: string) => (character.info.background = s)}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>ALIGNMENT</h3>
			<span>
				<Alignment {character} />
			</span>
		</div>

		<div class="info-subsection">
			<h3>CLASS</h3>
			<span>
				<TextInput
					value={character.info.class}
					onChange={(s: string) => (character.info.class = s)}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>RACE</h3>
			<span>
				<TextInput
					value={character.info.race}
					onChange={(s: string) => (character.info.race = s)}
				/>
			</span>
		</div>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.info-container {
		@apply w-full h-fit p-3 bg-z1
		grid grid-cols-2 items-center gap-2
		rounded-xl;
	}

	.info-section {
		@apply flex flex-col items-start gap-2;
		.info-subsection {
			@apply w-full
			flex flex-row items-center gap-2;

			h3 {
				@apply flex-1 main-text text-right;
			}
			span {
				@apply flex-3;
			}
		}
	}
</style>
