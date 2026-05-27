<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	import { Plus } from "@lucide/svelte";

	import { NAME, getPath, STORAGE_CHARACTER } from "$lib/global.svelte";

	import { type CharacterType, Character } from "$lib/character.svelte";
	import { getColor } from "$lib/classes";
	import {
		getCharacters,
		createCharacter,
		deleteCharacter,
	} from "$lib/supabase";

	import Header from "$lib/components/Header.svelte";
	import Main from "$lib/components/Main.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import TextInput from "$lib/components/base/TextInput.svelte";
	import CharacterDescriptor from "$lib/components/CharacterDescriptor.svelte";

	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";
	import { logger } from "$lib/logs";

	let inputUser = $state("");
	let user = $state("");

	onMount(async () => {
		// Get last user used
		let lastUser = localStorage.getItem("lastUser");
		inputUser = lastUser ? lastUser : "";
		await loadData();
		sessionStorage.removeItem(STORAGE_CHARACTER);

		// Set Base Color
		document.documentElement.style.setProperty(
			"--color-cta",
			getColor("default"),
		);
	});

	let loading = $state(false);
	let data = $state<Array<{ id: any; character: CharacterType }>>([]);
	const loadData = async () => {
		if (
			inputUser === "" ||
			inputUser.toLowerCase() === user.toLowerCase()
		) {
			return;
		}

		loading = true;

		user = inputUser;
		localStorage.setItem("lastUser", user);
		data = [];

		let rowData = await getCharacters(user);

		for (let d of rowData) {
			data.push({
				id: d.id,
				character: JSON.parse(d.character) as CharacterType,
			});
		}

		if (data.length === 0) {
			logger.error(user, "USER     ", `User (${user}) not found`);
		}

		loading = false;
	};

	const newCharacter = async () => {
		let char = new Character();
		let id = await createCharacter(user, char);
		if (id) {
			data.push({
				id: id,
				character: char,
			});
			logger.success(user, "USER     ", `Character (${id}) created`);
		}
	};
	const openCharacter = (id: string) => {
		let openIndex = data.findIndex((i) => i.id === id);
		if (openIndex !== -1) {
			sessionStorage.setItem(
				STORAGE_CHARACTER,
				JSON.stringify(data[openIndex].character),
			);
		}
		goto(getPath(user, id));
	};
	const removeCharacter = async (id: string) => {
		const CONFIRM_TEXT = "i want to delete this character";

		let confirm = prompt(
			`Are you sure?\nWrite: "${CONFIRM_TEXT.toUpperCase()}" to delete it.\n(Not case sensitive)`,
		);
		if (
			confirm &&
			confirm.trim().toLowerCase() === CONFIRM_TEXT.toLowerCase()
		) {
			let ok = await deleteCharacter(user, id);
			if (ok) {
				let deleteIndex = data.findIndex((i) => i.id === id);
				if (deleteIndex !== -1) {
					data.splice(deleteIndex, 1);
				}
				logger.success(user, "USER     ", `Character (${id}) deleated`);
			}
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>{user !== "" ? user : "Login"} - {NAME}</title>
</svelte:head>

<!------------------------------------------>

<Header />

<Main>
	<div class="w-full flex flex-col items-center gap-5">
		<form onsubmit={loadData} class="flex items-center">
			<h3 class="main-text h-min">USER:</h3>
			<TextInput rClass="rounded-l-lg" bind:value={inputUser} />
			<button
				type="submit"
				class="std-btn h-8 rounded-l-none"
				disabled={loading || inputUser === ""}
			>
				CONFIRM
			</button>
		</form>

		{#if user === ""}
			<Empty msg="INSERT USER" />
		{:else if loading}
			<Loading />
		{:else}
			<div class="w-full md:w-1/2 flex flex-col gap-3">
				<div class="flex justify-between items-center">
					<h1 class="main-text h-min">
						{user.toUpperCase()}'s CHARACTERS
					</h1>
					<button onclick={newCharacter} class="std-btn p-std">
						<Plus />
					</button>
				</div>

				<hr />

				{#each data as d}
					<CharacterDescriptor
						data={d}
						openFun={openCharacter}
						removeFun={removeCharacter}
					/>
				{:else}
					<Empty msg="NO CHARACTERS" />
				{/each}
			</div>
		{/if}
	</div>
</Main>

<Footer />

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
