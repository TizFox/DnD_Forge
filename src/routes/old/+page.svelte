<script lang="ts">
	const NAME = "D&D Forge";
	import logo from "$lib/assets/logo1000.png";

	import { KeyboardOff, Keyboard, FileUser } from "@lucide/svelte";

	import { FILE_EXTENTION, load, save } from "$lib/fileHandler";
	import { Character, type CharacterType } from "$lib/character.svelte";
	import { toggleKeyboard, showKeyboard } from "$lib/global.svelte";

	import CharacterSheet from "$lib/components/CharacterSheet.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let fileInput = $state<HTMLInputElement | null>(null);
	let fileName = $state<string | null>(null);
	let dndChar = $state<Character | null>(null);
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=1280" />
	<link rel="icon" href={logo} />
	<title>
		{(dndChar && dndChar.info.name != "" ? dndChar.info.name + " - " : "") +
			NAME}
	</title>
</svelte:head>

<!------------------------------------------>

<nav class="bar-container navbar">
	<img src={logo} alt="Logo" class="h-full" />
	<div class="user-actions">
		<button onclick={toggleKeyboard} class="base-button">
			{#if showKeyboard()}
				<KeyboardOff />
			{:else}
				<Keyboard />
			{/if}
		</button>

		<button
			onclick={() => {
				if (dndChar) {
					save(dndChar);
				}
				dndChar = new Character();
			}}
			class="base-button"
		>
			New Character
		</button>

		<button
			onclick={() => {
				if (dndChar) {
					save(dndChar);
				}
			}}
			disabled={dndChar === null}
			class="base-button"
		>
			Save
		</button>

		<!-- Input -->
		<div class="w-fit h-full max-h-(--max-btn-h) relative group rounded-lg">
			<button
				type="button"
				onclick={() => fileInput?.click()}
				class="w-full h-full px-10 bg-z2 rounded-lg
						base-border
						base-transition
						hover:border-cta
						text-left truncate
						{fileName ? 'text-std' : 'place-text'}"
			>
				<FileUser
					class="h-1/2 absolute top-1/4 left-3 base-transition text-std group-hover:text-cta"
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
				accept="application/json,{FILE_EXTENTION}"
				multiple={false}
			/>
		</div>
	</div>
</nav>

<main class="flex items-center justify-center">
	<div class="w-full max-w-7xl min-h-(--main-size) p-5 flex flex-col gap-5">
		<!--min-w-7xl-->
		{#if dndChar}
			<CharacterSheet character={dndChar} />
		{:else}
			<Empty msg="LOAD CHARACTER" />
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
		flex items-center gap-5;

		&.navbar {
			@apply justify-start;
			.user-actions {
				@apply w-full h-full
				flex items-center justify-end gap-5;
			}
		}

		&.footer {
			@apply justify-center;
		}
	}
</style>
