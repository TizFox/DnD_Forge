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
			<p>
				{spell.level}
			</p>
		</div>

		<div class="spell-actions">
			<button
				onclick={() => (showBody = !showBody)}
				class="std-btn p-half"
			>
				{#if showBody}
					<EyeOff />
				{:else}
					<Eye />
				{/if}
			</button>
			<button
				onclick={() => character.removeSpell(spell.name)}
				class="std-btn p-half"><Trash2 /></button
			>
		</div>
	</div>

	{#if showBody}
		<div class="spell-body">{JSON.stringify(spell)}</div>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.spell-container {
		@apply h-fit bg-z2 p-std
		flex flex-col gap-1
		rounded-lg;
	}

	.spell-header {
		@apply w-full
		flex flex-row gap-5;

		.spell-info {
			@apply flex-1
			flex flex-col items-start justify-center;
		}

		.spell-actions {
			@apply flex flex-row items-center gap-2;
		}
	}

	.spell-body {
	}
</style>
