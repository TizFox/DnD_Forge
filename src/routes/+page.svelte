<script lang="ts">
	const NAME = "D&D Forge";

	import logo from "$lib/assets/logo.svg";

	import { FileUser } from "@lucide/svelte";

	import type { Character } from "$lib/types";
	import { FILE_EXTENTION, load, save } from "$lib/dndCharHandler";
	import { createNewCharacter } from "$lib/characterHandler";

	import Info from "$lib/components/Info.svelte";
	import Stats from "$lib/components/Stats.svelte";

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
		<a href="/" class="h-full"
			><img src={logo} alt="Logo" class="h-full" /></a
		>

		<div class="user-actions">
			<button
				onclick={() => {
					dndChar = createNewCharacter();
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
							load(
								fileInput.files[0],
								(data: Character) => (dndChar = data),
							);
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
			<p>{JSON.stringify(dndChar)}</p>
		{/if}
	</div>
</main>

<footer class="footer-container">
	<div class="footer">
		<a href="/" class="h-full">
			<img src={logo} alt="Logo" class="h-full" />
		</a>
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
		@apply w-full h-full p-5
		flex flex-row justify-start items-center gap-5
		bg-z2 shadow-2xl;

		.user-actions {
			@apply w-full h-full
			flex flex-row justify-end items-center gap-5;
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
		@apply w-full h-full p-5 gap-5
		flex flex-row items-center justify-center
		bg-z2 shadow-2xl;
	}
</style>
