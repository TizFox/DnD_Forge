<script lang="ts">
	import { Trash2, Eye, EyeOff } from "@lucide/svelte";

	import type { Character } from "$lib/character.svelte";
	import type { Spell } from "$lib/types";

	type SpellcastingAbilityPropsType = {
		wClass?: string;
		character: Character;
		spell: Spell;
	};

	let {
		wClass = "w-full",
		character,
		spell,
	}: SpellcastingAbilityPropsType = $props();

	let showBody = $state<boolean>(false);
</script>

<!------------------------------------------>

<div class="{wClass} spell-container">
	<div class="spell-header">
		<div class="spell-info">
			<h3 class="main-text">{spell.name}</h3>
			<div class="spell-subinfo">
				<span class="flex-1 border-dark border-2 rounded-l-lg">
					{#if spell.level === 0}
						Cantrip
					{:else}
						LV. {spell.level}
					{/if}
				</span>

				<span class="flex-2 border-dark border-2">
					{spell.castingTime}
					{#if spell.castingTime === "Bonus"}
						Action
					{/if}
				</span>

				<span class="flex-3 border-dark border-2">
					{spell.duration}
				</span>

				<span class="flex-1 border-dark border-2 rounded-r-lg"
					>{spell.range}</span
				>
			</div>
		</div>

		<div class="spell-actions">
			<button
				onclick={() => (showBody = !showBody)}
				class="std-btn p-half aspect-square"
			>
				{#if showBody}
					<EyeOff />
				{:else}
					<Eye />
				{/if}
			</button>
			<button
				onclick={() => character.removeSpell(spell.name)}
				class="std-btn p-half aspect-square"><Trash2 /></button
			>
		</div>
	</div>

	{#if showBody}
		<div class="spell-body">
			{spell.manual}<br />
			{spell.school}, {spell.components}<br /><br />
			{spell.description}
			{#if spell.higherLevels !== ""}<br /><br />
				{spell.higherLevels}
			{/if}
		</div>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spell-container {
		@apply h-fit bg-z2 p-std
		flex flex-col
		rounded-lg;
	}

	.spell-header {
		@apply flex;

		.spell-info {
			@apply flex-5
			flex flex-col items-start justify-center;

			.spell-subinfo {
				@apply w-full
				flex
				text-center;
			}
		}

		.spell-actions {
			@apply flex-1
			flex items-center justify-end gap-2;
		}
	}

	.spell-body {
		@apply p-half border-dark border-2 rounded-lg;
	}
</style>
