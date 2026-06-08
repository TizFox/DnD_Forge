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
					class="flex-1 base-border
						{showBody ? 'rounded-tl-lg' : 'rounded-l-lg'}"
				>
					{#if spell.level === 0}
						Cantrip
					{:else}
						LV. {spell.level}
					{/if}
				</span>

				<span class="flex-2 base-border">
					{spell.castingTime}
					{#if spell.castingTime === "Bonus"}
						Action
					{/if}
				</span>

				<span class="flex-3 base-border">
					{spell.duration}
				</span>

				<span class="flex-1 base-border">{spell.range}</span>
			</div>
		</div>

		<button
			onclick={() => (showBody = !showBody)}
			class="base-button flex-1 max-h-none {showBody
				? 'rounded-b-none'
				: 'rounded-bl-none'}"
		>
			{#if showBody}
				<EyeOff />
			{:else}
				<Eye />
			{/if}
		</button>
	</div>

	{#if showBody}
		<div class="half-p base-border rounded-bl-lg">
			{spell.manual}<br />
			{spell.school}, {spell.components}<br /><br />
			{spell.description}
			{#if spell.higherLevels !== ""}<br /><br />
				{spell.higherLevels}
			{/if}
		</div>
		<button
			onclick={() => character.removeSpell(spell.name)}
			class="w-1/2 ml-auto base-button rounded-t-none"
		>
			<Trash2 />
		</button>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spell-container {
		@apply bg-z2 half-p
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
	}
</style>
