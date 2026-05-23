<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import type { PageProps } from "./$types";

	import { Plus } from "@lucide/svelte";

	import logo from "$lib/assets/logo1000.png";
	import { NAME, PATH } from "$lib/global.svelte";
	import { type CharacterType, Character } from "$lib/character.svelte";
	import { getCharacters, createCharacter } from "$lib/supabase";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { params }: PageProps = $props();
	let user = $derived(params.user);

	let loading = $state(true);
	let data = $state<Array<{ id: any; character: CharacterType }>>([]);
	onMount(async () => {
		let rowData = await getCharacters(user);

		for (let d of rowData) {
			data.push({
				id: d.id,
				character: JSON.parse(d.character) as CharacterType,
			});
		}

		loading = false;
	});

	const newCharacter = async () => {
		let char = new Character();
		let id = await createCharacter(user, char);
		goto(PATH + "/" + user + "/" + id);
	};
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>USER - {NAME}</title>
</svelte:head>

<!------------------------------------------>

{#if loading}
	<Loading />
{:else}
	<div class="w-full md:w-1/2 flex flex-col gap-3">
		<div class="flex justify-between">
			<h1 class="main-text">{user.toUpperCase()}'s CHARACTERS</h1>
			<button onclick={newCharacter} class="std-btn p-std">
				<Plus />
			</button>
		</div>

		<hr />

		{#each data as d}
			<a href="{PATH}/{user}/{d.id}">
				<BaseContainer
					extraClasses="border-2 transition-std border-dark hover:border-cta"
				>
					{d.character.info.name}
					{d.character.info.level}
				</BaseContainer>
			</a>
		{:else}
			<Empty msg="NO CHARACTERS" />
		{/each}
	</div>
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
