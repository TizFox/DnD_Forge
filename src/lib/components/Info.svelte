<script lang="ts">
	import { Character } from "$lib/character.svelte";

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
		<h3 class="main-text">Character Name</h3>
		<input
			bind:value={character.info.name}
			class="std-input"
			defaultValue={character.info.name}
			type="text"
		/>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3 class="flex-1 main-text">Level</h3>
			<input
				bind:value={character.info.level}
				class="flex-1 no-spinner std-input"
				defaultValue={character.info.level}
				type="number"
			/>
		</div>
		<div class="info-subsection">
			<h3 class="main-text">Proficiency Bonus</h3>
			<p
				class="h-8 bg-z2 flex items-center justify-center px-3 rounded-lg"
			>
				{proficiencyBonus}
			</p>
		</div>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3 class="flex-1 main-text">Class</h3>
			<input
				bind:value={character.info.class}
				class="flex-1 std-input"
				defaultValue={character.info.class}
				type="text"
			/>
		</div>
		<div class="info-subsection">
			<h3 class="flex-1 main-text">Race</h3>
			<input
				bind:value={character.info.race}
				class="flex-1 std-input"
				defaultValue={character.info.race}
				type="text"
			/>
		</div>
	</div>

	<div class="info-section">
		<h3 class="main-text">Alignment</h3>
		<Alignment {character} />
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.info-container {
		@apply w-full
		flex flex-row items-center gap-5;
	}

	.info-section {
		@apply flex flex-col items-start gap-1;
		.info-subsection {
			@apply w-full
			flex flex-row items-center gap-2;
		}
	}
</style>
