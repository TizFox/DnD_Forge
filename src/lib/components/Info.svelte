<script lang="ts">
	import { Character } from "$lib/character.svelte";

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
			class="bg-z2 text-left px-3 rounded-lg"
			defaultValue={character.info.name}
			type="text"
		/>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3 class="flex-1 main-text">Level</h3>
			<input
				bind:value={character.info.level}
				class="flex-1 no-spinner bg-z2 text-left px-3 rounded-lg"
				defaultValue={character.info.level}
				type="number"
			/>
		</div>
		<div class="info-subsection">
			<h3 class="main-text">Proficiency Bonus</h3>
			<p class="bg-z2 text-left px-3 rounded-lg">
				{proficiencyBonus}
			</p>
		</div>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.info-container {
		@apply w-full flex flex-row items-center gap-5;
	}

	.info-section {
		@apply flex flex-col items-start gap-1;
		.info-subsection {
			@apply w-full flex flex-row items-center gap-2;
		}
	}
</style>
