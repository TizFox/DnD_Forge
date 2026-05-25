<script lang="ts">
	import { goto } from "$app/navigation";

	import { Plus } from "@lucide/svelte";

	import logo from "$lib/assets/logo1000.png";
	import { NAME, PATH } from "$lib/global.svelte";

	import { type CharacterType, Character } from "$lib/character.svelte";
	import { getCharacters, createCharacter } from "$lib/supabase";

	import TextInput from "$lib/baseComponents/TextInput.svelte";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let inputUser = $state("");
	let user = $state("");

	let loading = $state(false);
	let data = $state<Array<{ id: any; character: CharacterType }>>([]);
	const loadData = async () => {
		loading = true;

		user = inputUser;
		data = [];

		let rowData = await getCharacters(user);

		for (let d of rowData) {
			data.push({
				id: d.id,
				character: JSON.parse(d.character) as CharacterType,
			});
		}

		if (data.length === 0) {
			inputUser = "";
		}

		loading = false;
	};

	const newCharacter = async () => {
		let char = new Character();
		let id = await createCharacter(user, char);
		goto(PATH + "/" + user + "_" + id);
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
		<h3 class="main-text h-min p-half">USER:</h3>
		<TextInput
			rClass="rounded-l-lg"
			value={inputUser}
			onChange={(s: string) => (inputUser = s)}
		/>
		<button
			type="submit"
			class="std-btn rounded-none rounded-r-lg"
			disabled={loading || inputUser === ""}
		>
			CONFIRM
		</button>
	</form>

	{#if user !== ""}
		{#if loading}
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
					<a href="{PATH}/{user}_{d.id}">
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
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
