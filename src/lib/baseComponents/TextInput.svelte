<script lang="ts">
	type TextInputPropsType = {
		wClass?: string;
		rClass?: string;
		title?: string;
		value: string;
		placeholder?: string;
		suggestions?: { id: string; options: string[] };
		onChange: (s: string) => void;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		title = "",
		value,
		placeholder = "",
		suggestions = { id: "", options: [] },
		onChange,
	}: TextInputPropsType = $props();
</script>

<!------------------------------------------>

<div class="{wClass} relative flex flex-col">
	{#if title !== ""}
		<span class="main-text">{title.toUpperCase()}</span>
	{/if}
	<input
		list={suggestions.id}
		class="{rClass} text-input"
		bind:value
		{placeholder}
		type="text"
		onchange={() => onChange(value)}
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
		@apply h-8 px-std bg-z2 text-left
		border-2 border-dark
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
</style>
