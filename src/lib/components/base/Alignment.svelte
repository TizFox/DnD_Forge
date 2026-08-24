<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";
	import { MoralityEnum, OrderEnum } from "$lib/types";

    import { lockInput } from "$lib/global.svelte";

	type AlignmentPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: AlignmentPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex">
	<select
		bind:value={character.info.alignment.morality}
		disabled={lockInput()}
		class="morality-select"
	>
		{#each Object.values(MoralityEnum) as mor}
			<option value={mor}>{m[mor]()}</option>
		{/each}
	</select>
	<select
		bind:value={character.info.alignment.order}
		disabled={lockInput()}
		class="order-select"
	>
		{#each Object.values(OrderEnum) as ord}
			<option value={ord}>{m[ord]()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	select {
		@apply flex-1 h-8 px-3 bg-z2 text-left
		base-border
		base-transition focus:border-cta
		focus:outline-none
		focus:shadow-none
		disabled:border-z0;

		&.morality-select {
			@apply rounded-l-lg;
		}
		&.order-select {
			@apply rounded-r-lg;
		}
	}
</style>
