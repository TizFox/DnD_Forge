<script lang="ts">
	const NAME = "D&D Forge";
	import logo from "$lib/assets/logo1000.png";

	import { FileUser } from "@lucide/svelte";

	import { FILE_EXTENTION, load, save } from "$lib/fileHandler";
	import { Character, type CharacterType } from "$lib/character.svelte";
	import { getColor } from "$lib/classColors";

	// full
	import Info from "$lib/components/Info.svelte";

	// 1/3
	import Stats from "$lib/components/Stats.svelte";

	// 2/3
	import Ca from "$lib/components/Ca.svelte";
	import Hp from "$lib/components/Hp.svelte";
	import Actions from "$lib/components/Actions.svelte";
	import Passive from "$lib/components/Passive.svelte";
	import Equipment from "$lib/components/Equipment.svelte";

	// 3/3
	import Features from "$lib/components/Features.svelte";
	import Characteristics from "$lib/components/Characteristics.svelte";

	let fileInput = $state<HTMLInputElement | null>(null);
	let fileName = $state<string | null>(null);
	let dndChar = $state<Character | null>(null);

	$effect(() => {
		if (!dndChar) {
			document.documentElement.style.setProperty(
				"--color-cta",
				getColor("default"),
			);
			return;
		}

		document.documentElement.style.setProperty(
			"--color-cta",
			getColor(dndChar.info.class.toLowerCase()),
		);
	});
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

<nav class="bar-container navbar">
	<img src={logo} alt="Logo" class="h-full" />
	<div class="user-actions">
		<button
			onclick={() => {
				if (dndChar) {
					save(dndChar);
				}
				dndChar = new Character();
			}}
			class="std-btn"
		>
			New Character
		</button>

		<button
			onclick={() => {
				if (dndChar) {
					save(dndChar);
				}
			}}
			class="std-btn"
		>
			Save
		</button>

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
</nav>

<main class="flex items-center justify-center">
	<div class="w-full max-w-7xl min-h-(--main-size) p-5 flex flex-col gap-5">
		<!--min-w-7xl-->
		{#if dndChar}
			<Info character={dndChar} />
			<div class="w-full flex flex-row gap-5">
				<Stats wClass="w-1/3" character={dndChar} />
				<div class="w-1/3 flex flex-col gap-5">
					<Ca character={dndChar} />
					<Hp character={dndChar} />
					<Actions character={dndChar} />
					<Passive character={dndChar} />
					<Equipment character={dndChar} />
				</div>
				<div class="w-1/3 flex flex-col gap-5">
					<Features character={dndChar} />
					<Characteristics character={dndChar} />
				</div>
			</div>

			<p>{JSON.stringify(dndChar)}</p>
		{/if}
	</div>
</main>

<footer class="bar-container footer">
	<img src={logo} alt="Logo" class="h-full" />
	<div>
		<h1 class="main-text">{NAME}</h1>
		<p>
			By <a target="_blank" href="https://github.com/TizFox" class="link">
				TizFox
			</a>
		</p>
	</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.bar-container {
		@apply w-full h-(--bars-size) px-5 py-2 bg-z2
		flex flex-row items-center gap-5;

		&.navbar {
			@apply justify-start;
			.user-actions {
				@apply w-full h-full
				flex flex-row items-center justify-end gap-5;
			}
		}

		&.footer {
			@apply justify-center;
		}
	}
</style>
