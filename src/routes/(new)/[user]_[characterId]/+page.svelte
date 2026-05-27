<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";

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
	let user = $derived(params.user);
	let characterId = $derived(params.characterId);

	// Loading Character
	let loading = $state(true);
	let character = $state<Character>();
	onMount(async () => {
		let data = await getCharacter(user, characterId);
		if (data) {
			character = Character.from(
				JSON.parse(data.character) as CharacterType,
			);
		}
		loading = false;
	});

	// Header Actions
	import { Keyboard, KeyboardOff, Save } from "@lucide/svelte";

	let justMounted = true;
	let saved = $state<boolean>(true);
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

	let autoSave: ReturnType<typeof setTimeout>;
	$effect(() => {
		if (justMounted) {
			justMounted = false;
			return;
		}

		// Save 1.5s after last edit
		$state.snapshot(character);
		clearTimeout(autoSave);
		saved = false;
		autoSave = setTimeout(handleSave, 1500);
	});
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
	{#if loading}
		<Loading />
	{:else if character}
		<CharacterSheet {character} />
	{:else}
		<Empty msg="CHARACTER NOT FOUND" />
	{/if}
</Main>

<Footer />

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
