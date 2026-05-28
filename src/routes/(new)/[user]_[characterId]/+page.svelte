<script lang="ts">
	import { onMount, tick, untrack } from "svelte";
	import type { PageProps } from "./$types";

	import { LoaderCircle, Save, Keyboard, KeyboardOff } from "@lucide/svelte";

	import {
		NAME,
		showKeyboard,
		STORAGE_CHARACTER,
		toggleKeyboard,
	} from "$lib/global.svelte";
	import { getCharacter, saveCharacter } from "$lib/supabase";
	import { logger } from "$lib/logs";
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
	let loading = $state(true);
	let ready = false;
	let character = $state<Character>();

	onMount(async () => {
		let jsonChar = sessionStorage.getItem(STORAGE_CHARACTER);
		if (jsonChar) {
			character = Character.from(JSON.parse(jsonChar)) as CharacterType;
			logger.info(
				user,
				"CHARACTER",
				`Character (${characterId}) found in Storage`,
			);
		} else {
			// Do supabase request only if character is not found in sessionStorage
			let data = await getCharacter(user, characterId);
			if (data) {
				character = Character.from(
					JSON.parse(data.character),
				) as CharacterType;
				logger.warn(
					user,
					"CHARACTER",
					`Character (${characterId}) found in Supabase`,
				);

				sessionStorage.setItem(
					STORAGE_CHARACTER,
					JSON.stringify(character),
				);
			}
		}

		if (!character) {
			logger.error(
				user,
				"CHARACTER",
				`Character (${characterId}) not found`,
			);
		}

		await tick();
		loading = false;
		ready = true;
	});

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
			logger.success(
				user,
				"CHARACTER",
				`Character (${characterId}) saved`,
			);
			sessionStorage.setItem(
				STORAGE_CHARACTER,
				JSON.stringify(character),
			);
			saved = true;
		} else {
			logger.error(
				user,
				"CHARACTER",
				`Character (${characterId}) not saved`,
			);
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
			<span class="text-cta">Saved.</span>
		{:else}
			<LoaderCircle size="2rem" class="text-cta animate-spin" />
		{/if}
		<button onclick={handleSave} class="base-button"><Save /></button>
	</div>
	<button onclick={toggleKeyboard} class="base-button">
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
