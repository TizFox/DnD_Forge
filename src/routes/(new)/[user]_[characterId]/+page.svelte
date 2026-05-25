<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";

	import { NAME } from "$lib/global.svelte";
	import { getCharacter } from "$lib/supabase";
	import { type CharacterType, Character } from "$lib/character.svelte";

	let { params }: PageProps = $props();
	let user = $derived(params.user);
	let characterId = $derived(params.characterId);

	let loading = $state(true);
	let character = $state<Character | null>(null);
	onMount(async () => {
		let data = await getCharacter(user, characterId);
		if (data) {
			character = Character.from(
				JSON.parse(data.character) as CharacterType,
			);
		}
		loading = false;
	});

	import CharacterSheet from "$lib/components/CharacterSheet.svelte";

	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=1280" />
	<title>
		{(character && character.info.name != ""
			? character.info.name + " - "
			: "") + NAME}
	</title>
</svelte:head>

<!------------------------------------------>

{#if loading}
	<Loading />
{:else if character}
	<CharacterSheet {user} id={characterId} {character} />
{:else}
	<Empty msg="CHARACTER NOT FOUND" />
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
