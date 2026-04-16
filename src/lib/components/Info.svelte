<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import Alignment from "$lib/baseComponents/Alignment.svelte";
	import NumberInput from "$lib/baseComponents/NumberInput.svelte";
	import TextInput from "$lib/baseComponents/TextInput.svelte";

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
			<h3>Character Name</h3>
			<TextInput
				wClass="flex-2"
				value={character.info.name}
				onChange={(s: string) => (character.info.name = s)}
			/>
		</div>

		<div class="info-subsection">
			<h3>Player Name</h3>
			<TextInput
				wClass="flex-2"
				value={character.info.player}
				onChange={(s: string) => (character.info.player = s)}
			/>
		</div>

		<div class="info-subsection">
			<h3>Level</h3>
			<NumberInput
				wClass="flex-2"
				minValue={1}
				value={character.info.level}
				onChange={(n: number) => (character.info.level = n)}
			/>
		</div>
		<div class="info-subsection">
			<h3>Proficiency Bonus</h3>
			<p
				class="flex-2 h-8 bg-z2 flex items-center justify-center px-3 rounded-lg"
			>
				{proficiencyBonus}
			</p>
		</div>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3>Background</h3>
			<TextInput
				wClass="flex-2"
				value={character.info.background}
				onChange={(s: string) => (character.info.background = s)}
			/>
		</div>
		<div class="info-subsection">
			<h3>Alignment</h3>
			<Alignment wClass="flex-2" {character} />
		</div>

		<div class="info-subsection">
			<h3>Class</h3>
			<TextInput
				wClass="flex-2"
				value={character.info.class}
				onChange={(s: string) => (character.info.class = s)}
			/>
		</div>
		<div class="info-subsection">
			<h3>Race</h3>
			<TextInput
				wClass="flex-2"
				value={character.info.race}
				onChange={(s: string) => (character.info.race = s)}
			/>
		</div>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	h3 {
		@apply main-text flex-1 text-right;
	}

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
		}
	}
</style>
