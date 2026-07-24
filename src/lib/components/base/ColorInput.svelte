<script lang="ts">
	import { Paintbrush } from "@lucide/svelte";

	type ColorInputPropsType = {
		value: string;
		onChange: () => void;
	};

	let { value = $bindable(""), onChange }: ColorInputPropsType = $props();

	let colorInput = $state<HTMLInputElement>();
</script>

<!------------------------------------------>

<button onclick={() => colorInput?.click()} class="relative base-button">
	<Paintbrush />
	<input
		bind:this={colorInput}
		bind:value
		onchange={onChange}
		class="absolute top-full right-full w-0 h-0 opacity-0 pointer-events-none"
		type="color"
	/>
</button>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
