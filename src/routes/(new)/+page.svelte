<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	import * as m from "$lib/paraglide/messages";

	import { Upload, Plus } from "@lucide/svelte";

	import {
		NAME,
		getPath,
		STORAGE_USER,
		STORAGE_CHARACTER,
		BASE_COLOR,
        toCapitalizeCase,
	} from "$lib/global.svelte";

	import { save } from "$lib/fileHandler";

	import { type CharacterType, Character } from "$lib/character.svelte";
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
		let lastUser = localStorage.getItem(STORAGE_USER);
		inputUser = lastUser ? lastUser : "";
		await loadData();
		sessionStorage.removeItem(STORAGE_CHARACTER);

		// Set Base Color
		document.documentElement.style.setProperty("--color-cta", BASE_COLOR);
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
		localStorage.setItem(STORAGE_USER, user);
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

	const uploadCharacter = async () => {}; // TODO
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
	const downloadCharacter = (id: string) => {
		let downloadIndex = data.findIndex((i) => i.id === id);
		if (downloadIndex !== -1) {
			save(data[downloadIndex].character);
		}
	};
	const removeCharacter = async (id: string) => {
		const confirmText = m.delete_character_text().toUpperCase();
		let confirm = prompt(m.delete_character_prompt({ confirmText }));

		if (
			confirm &&
			confirm.trim().toUpperCase() === confirmText
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
	<title>{user !== "" ? user : "Login"} - {NAME}</title>
</svelte:head>

<!------------------------------------------>

<Header />

<Main>
	<div class="w-full flex flex-col items-center gap-5">
		<form onsubmit={loadData} class="flex items-center">
			<h3 class="main-text h-min">{m.homepage_user()}:</h3>
			<TextInput
				bind:value={inputUser}
				rClass="rounded-l-lg"
			/>
			<button
				type="submit"
				class="base-button h-8 bg-z2 rounded-l-none hover:bg-cta"
				disabled={loading || inputUser === ""}
			>
				{m.common_confirm()}
			</button>
		</form>

		{#if user === ""}
			<Empty msg={m.empty_insert_user()} />
		{:else if loading}
			<Loading msg={m.loading_characters()} />
		{:else}
			<div class="w-full md:w-1/2 flex flex-col gap-3">
				<div class="flex justify-between items-center">
					<h1 class="main-text h-min">
						{m.homepage_title({ user: toCapitalizeCase(user) })}
					</h1>
					<div class="flex">
						<button
							onclick={uploadCharacter}
							class="base-button base-p rounded-r-none"
						>
							<Upload />
						</button>
						<button
							onclick={newCharacter}
							class="base-button base-p rounded-l-none"
						>
							<Plus />
						</button>
					</div>
				</div>

				<hr />

				{#each data as d}
					<CharacterDescriptor
						data={d}
						openFun={openCharacter}
						downloadFun={downloadCharacter}
						removeFun={removeCharacter}
					/>
				{:else}
					<Empty msg={m.empty_no_characters()} />
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
