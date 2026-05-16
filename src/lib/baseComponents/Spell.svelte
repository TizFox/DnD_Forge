<script lang="ts">
	import { Trash2, Eye, EyeOff } from "@lucide/svelte";

	import type { Character } from "$lib/character.svelte";
	import type { Spell } from "$lib/types";

	type SpellPropsType = {
		wClass?: string;
		character: Character;
		spell: Spell;
	};

	let { wClass = "w-full", character, spell }: SpellPropsType = $props();

	let showBody = $state<boolean>(false);
</script>

<!------------------------------------------>

<div class="{wClass} spell-container">
	<div class="spell-header">
		<div class="spell-info">
			<h3 class="main-text">{spell.name.toUpperCase()}</h3>
			<div class="spell-subinfo">
				<span
					class="flex-1 border-dark border-2
						{showBody ? 'rounded-tl-lg' : 'rounded-l-lg'}"
				>
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

				<span class="flex-1 border-dark border-2">{spell.range}</span>
			</div>
		</div>

		<div class="spell-actions">
			<button
				onclick={() => (showBody = !showBody)}
				class="std-btn rounded-none rounded-tl-lg"
			>
				{#if showBody}
					<EyeOff />
				{:else}
					<Eye />
				{/if}
			</button>
			<button
				onclick={() => character.removeSpell(spell.name)}
				class="std-btn rounded-none
					{showBody ? 'rounded-tr-lg' : 'rounded-r-lg'}"
			>
				<Trash2 />
			</button>
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
		@apply bg-z2 p-half
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
			flex justify-end;

			.std-btn {
				@apply flex-1 max-h-none;
			}
		}
	}

	.spell-body {
		@apply p-half
		border-dark border-2 rounded-b-lg;
	}
</style>
