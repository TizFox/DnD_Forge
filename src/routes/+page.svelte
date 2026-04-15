<script lang="ts">
	const NAME = "D&D Forge";
	import logo from "$lib/assets/logo1000.png";

	import { FileUser } from "@lucide/svelte";

	import { FILE_EXTENTION, load, save } from "$lib/dndCharHandler";
	import { Character } from "$lib/character.svelte";
	import type { CharacterType } from "$lib/character.svelte";

	import Info from "$lib/components/Info.svelte";
	import Stats from "$lib/components/Stats.svelte";
	import TextInput from "$lib/components/TextInput.svelte";

	let fileInput = $state<HTMLInputElement | null>(null);
	let fileName = $state<string | null>(null);
	let dndChar = $state<Character | null>(null);
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>
		{dndChar && dndChar.info.name != ""
			? dndChar.info.name + " - Character Sheet"
			: NAME}
	</title>
</svelte:head>

<!------------------------------------------>

<nav class="navbar-container">
	<div class="navbar">
		<img src={logo} alt="Logo" class="h-full" />
		<div class="user-actions">
			<button
				onclick={() => {
					dndChar = new Character();
				}}
				class="std-btn">New Character</button
			>

			<button
				onclick={() => {
					if (dndChar) {
						save(dndChar);
					}
				}}
				class="std-btn">Save</button
			>

			<!-- Input -->
			<div class="w-fit relative group rounded-lg">
				<button
					type="button"
					onclick={() => fileInput?.click()}
					class="w-full h-full px-11 py-3 bg-z2 rounded-lg
						border-2 border-dark transition-std
						hover:border-cta
						base-text text-left truncate
						{fileName ? 'text-dark' : 'text-dark/25'}"
				>
					<FileUser
						class="h-1/2 absolute top-1/4 left-3 transition-std text-dark group-hover:text-cta"
					/>
					{fileName ?? "Character FIle"}
				</button>
				<input
					bind:this={fileInput}
					oninput={() => {
						if (fileInput?.files && fileInput.files.length > 0) {
							fileName = fileInput.files[0].name;
							load(fileInput.files[0], (data: CharacterType) => {
								dndChar = Character.from(data);
							});
						}
					}}
					class="hidden"
					type="file"
					accept={FILE_EXTENTION}
					multiple={false}
				/>
			</div>
		</div>
	</div>
</nav>

<section class="divider"></section>

<main class="flex items-center justify-center">
	<div class="scene">
		{#if dndChar}
			<Info character={dndChar} />
			<Stats character={dndChar} />
			{#each Object.entries(dndChar.info.characteristics) as [key, value]}
				<TextInput
					title={key.replace("_", " ")}
					text={value}
					setText={(s: string) => {
						dndChar!.info.characteristics[
							key as keyof CharacterType["info"]["characteristics"]
						] = s;
					}}
				/>
			{/each}
			<p>{JSON.stringify(dndChar)}</p>
		{/if}
	</div>
</main>

<footer class="footer-container">
	<div class="footer">
		<img src={logo} alt="Logo" class="h-full" />
		<div>
			<h1>{NAME}</h1>
			<p>
				By <a
					target="_blank"
					href="https://github.com/TizFox"
					class="link"
				>
					TizFox
				</a>
			</p>
		</div>
	</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.navbar-container {
		@apply w-full h-(--bars-size) z-10
		fixed top-0 left-0;
	}
	.navbar {
		@apply w-full h-full p-5 bg-z2
		flex flex-row items-center justify-start gap-5
		shadow-2xl;

		.user-actions {
			@apply w-full h-full
			flex flex-row items-center justify-end gap-5;
		}
	}

	.divider {
		@apply h-(--bars-size);
	}

	.scene {
		@apply w-full max-w-7xl min-h-(--main-size) p-5;
	}

	.footer-container {
		@apply w-full h-(--bars-size) z-10;
	}
	.footer {
		@apply w-full h-full p-5 bg-z2
		flex flex-row items-center justify-center gap-5
		shadow-2xl;
	}
</style>
