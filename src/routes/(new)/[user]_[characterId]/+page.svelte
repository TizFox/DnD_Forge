<script lang="ts">
	import { onMount, tick, untrack } from "svelte";
	import type { PageProps } from "./$types";

	import { Keyboard, KeyboardOff, Save } from "@lucide/svelte";

	import { NAME, showKeyboard, toggleKeyboard } from "$lib/global.svelte";
	import { getCharacter, saveCharacter } from "$lib/supabase";
	import { type CharacterType, Character } from "$lib/character.svelte";

	import Header from "$lib/components/Header.svelte";
	import Main from "$lib/components/Main.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import CharacterSheet from "$lib/components/CharacterSheet.svelte";

	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { params }: PageProps = $props();
	let user = untrack(() => params.user);
	let characterId = untrack(() => params.characterId);

	// Loading Character
	let ready = false;
	let character = $state<Character>();
	let characterPromise = getCharacter(user, characterId).then(
		async (data) => {
			if (!data) {
				return false;
			}
			character = Character.from(
				JSON.parse(data.character) as CharacterType,
			);
			await tick();
			ready = true;
			return true;
		},
	);

	// Auto Save
	let saved = $state<boolean>(true);
	let autoSave: ReturnType<typeof setTimeout>;
	$effect(() => {
		$state.snapshot(character); // Check if character is changed

		if (!ready) {
			return;
		}

		// Save 1.5s after last edit
		clearTimeout(autoSave);
		saved = false;
		autoSave = setTimeout(handleSave, 1500);
	});

	// Header Actions
	const handleSave = async () => {
		if (saved) {
			return;
		}

		let ok = await saveCharacter(user, characterId, character);
		if (ok) {
			saved = true;
		} else {
			autoSave = setTimeout(handleSave, 1500);
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<title>
		{(character && character.info.name != ""
			? character.info.name + " - "
			: "") + NAME}
	</title>
</svelte:head>

<!------------------------------------------>

<Header>
	<div class="flex items-center gap-2">
		{#if saved}
			<span class="text-green-400">Saved.</span>
		{:else}
			<span class="text-yellow-400">Saving...</span>
		{/if}
		<button onclick={handleSave} class="std-btn"><Save /></button>
	</div>
	<button onclick={toggleKeyboard} class="std-btn">
		{#if showKeyboard()}
			<Keyboard />
		{:else}
			<KeyboardOff />
		{/if}
	</button>
</Header>

<Main>
	{#await characterPromise}
		<Loading />
	{:then success}
		{#if success && character}
			<CharacterSheet {character} />
		{:else}
			<Empty msg="CHARACTER NOT FOUND" />
		{/if}
	{/await}
</Main>

<Footer />

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
