<script lang="ts">
	import { Character } from "$lib/character.svelte";

	type TextInputPropsType = {
		title: string;
		text: string;
		setText: (s: string) => void;
	};

	let { title, text, setText }: TextInputPropsType = $props();
</script>

<!------------------------------------------>

<div class="text-container">
	<h2 class="main-text">{title.toUpperCase()}</h2>
	<textarea
		bind:value={text}
		onchange={() => setText(text)}
		class="text-input"
	>
	</textarea>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.text-container {
		@apply w-full p-3 bg-z1
		flex flex-col items-center justify-center gap-1
		rounded-xl;
	}
	.text-input {
		@apply w-full h-full p-3 bg-z2
		rounded-lg;
	}
</style>
