<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";
	import { SizeEnum } from "$lib/types";

    import { lockInput } from "$lib/global.svelte";

	import TextInput from "$lib/components/base/TextInput.svelte";

	type RacePropsType = {
		wClass?: string;
		character: Character;
		placeholder: string;
	};

	let { wClass = "w-full", character, placeholder }: RacePropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex">
	<TextInput
		bind:value={character.info.race}
		rClass="rounded-l-lg"
		placeholder={placeholder}
	/>
	<select
		bind:value={character.info.size}
		disabled={lockInput()}
		class="race-select"
	>
		{#each Object.values(SizeEnum) as siz}
			<option value={siz}>{m[siz]()}</option>
		{/each}
	</select>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.race-select {
		@apply w-min h-8 base-px bg-z2 text-left
		base-border rounded-r-lg
		base-transition
		focus:border-cta
		focus:outline-none
		focus:shadow-none
		disabled:border-z0;
	}
</style>
