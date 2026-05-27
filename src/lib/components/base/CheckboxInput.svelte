<script lang="ts">
	type CheckboxInputPropsType = {
		wClass?: string;
		rClass?: string;
		visible?: boolean;
		checked: boolean;
	};

	let {
		wClass = "w-8",
		rClass = "rounded-lg",
		visible = true,
		checked = $bindable(false),
	}: CheckboxInputPropsType = $props();
</script>

<!------------------------------------------>

<input
	class="{wClass} {rClass} checkbox-input {visible ? '' : 'invisible'}"
	bind:checked
	type="checkbox"
/>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.checkbox-input {
		@apply h-8 appearance-none
		bg-z2 border-2 border-dark
		transition-std
		checked:bg-cta checked:border-cta
		hover:cursor-pointer;
	}
</style>
