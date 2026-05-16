<script lang="ts">
	type TextInputPropsType = {
		wClass?: string;
		rClass?: string;
		value: string;
		placeholder?: string;
		suggestions?: { id: string; options: string[] };
		onChange: (s: string) => void;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		value,
		placeholder = "",
		suggestions = { id: "", options: [] },
		onChange,
	}: TextInputPropsType = $props();
</script>

<!------------------------------------------>

<input
	list={suggestions.id}
	class="{wClass} {rClass} text-input"
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
