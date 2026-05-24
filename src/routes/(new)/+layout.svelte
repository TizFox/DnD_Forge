<script lang="ts">
	import type { LayoutProps } from "./$types";

	import { Save, KeyboardOff, Keyboard } from "@lucide/svelte";

	import logo from "$lib/assets/logo1000.png";
	import {
		NAME,
		PATH,
		showKeyboard,
		toggleKeyboard,
	} from "$lib/global.svelte";

	let { children }: LayoutProps = $props();
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<!------------------------------------------>

<nav class="bar-container navbar">
	<a href={PATH} class="h-full">
		<img src={logo} alt="Logo" class="h-full" />
	</a>
	<div class="user-actions">
		<button onclick={toggleKeyboard} class="std-btn">
			{#if showKeyboard()}
				<KeyboardOff />
			{:else}
				<Keyboard />
			{/if}
		</button>
	</div>
</nav>

<main class="flex items-center justify-center">
	<div
		class="relative w-full max-w-7xl min-h-(--main-size) p-5 flex flex-col items-center gap-5"
	>
		{@render children()}
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
