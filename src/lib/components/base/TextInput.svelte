<script lang="ts">
    import { lockInput } from "$lib/global.svelte";

	type TextInputPropsType = {
		wClass?: string;
		rClass?: string;
		title?: string;
		value: string;
		placeholder?: string;
		suggestions?: { id: string; options: string[] };
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		title = "",
		value = $bindable(""),
		placeholder = "",
		suggestions = { id: "", options: [] },
	}: TextInputPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} relative flex flex-col">
	{#if title !== ""}
		<span class="main-text">{title.toUpperCase()}</span>
	{/if}
	<input
		bind:value
		disabled={lockInput()}
		list={suggestions.id}
		class="{rClass} text-input"
		{placeholder}
		type="text"
	/>

	{#if suggestions.id != ""}
		<datalist id={suggestions.id}>
			{#each suggestions.options as opt}
				<option value={opt}></option>
			{/each}
		</datalist>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.text-input {
		@apply h-8 base-px bg-z2
		text-left
		base-border
		base-transition
		focus:border-cta
		focus:outline-none
		focus:shadow-none
		disabled:border-z0;
	}
</style>
