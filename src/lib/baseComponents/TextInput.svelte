<script lang="ts">
	type TextInputPropsType = {
		wClass?: string;
		rClass?: string;
		value: string;
		onChange: (s: string) => void;
	};

	let {
		wClass = "w-full",
		rClass = "rounded-lg",
		value,
		onChange,
	}: TextInputPropsType = $props();
</script>

<!------------------------------------------>

<input
	class="{wClass} {rClass} text-input"
	bind:value
	type="text"
	onchange={() => onChange(value)}
/>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.text-input {
		@apply h-8 px-3 bg-z2 text-left
		border-2 border-dark
		transition-std
		focus:border-cta
		focus:outline-none
		focus:shadow-none;
	}
</style>
