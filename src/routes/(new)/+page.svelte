<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	import { Plus } from "@lucide/svelte";

	import { NAME, getPath } from "$lib/global.svelte";

	import { type CharacterType, Character } from "$lib/character.svelte";
	import { getColor } from "$lib/classes";
	import {
		getCharacters,
		createCharacter,
		deleteCharacter,
	} from "$lib/supabase";

	import TextInput from "$lib/baseComponents/TextInput.svelte";

	import CharacterDescriptor from "$lib/components/CharacterDescriptor.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let inputUser = $state("");
	let user = $state("");

	onMount(async () => {
		// Get last user used
		let lastUser = localStorage.getItem("lastUser");
		inputUser = lastUser ? lastUser : "";
		await loadData();

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

		loading = false;
	};

	const newCharacter = async () => {
		let char = new Character();
		let id = await createCharacter(user, char);
		if (id) {
			openCharacter(id);
		}
	};

	const openCharacter = (id: string) => {
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
			await deleteCharacter(user, id);
			goto(getPath(user, "tmp")).then(() => goto(getPath()));
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>{user !== "" ? user : "Login"} - {NAME}</title>
</svelte:head>

<!------------------------------------------>

<div class="w-full flex flex-col items-center gap-5">
	<form onsubmit={loadData} class="flex items-center">
		<h3 class="main-text h-min">USER:</h3>
		<TextInput
			rClass="rounded-l-lg"
			value={inputUser}
			onChange={(s: string) => (inputUser = s)}
		/>
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

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
