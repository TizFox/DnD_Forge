<script lang="ts">
    import { lockInput } from "$lib/global.svelte";

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
	bind:checked
	disabled={lockInput()}
	class="{wClass} {rClass} checkbox-input {visible ? '' : 'invisible'}"
	type="checkbox"
/>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.checkbox-input {
		@apply h-8 appearance-none
		bg-z2 base-border
		base-transition
		checked:bg-cta checked:border-cta
		hover:cursor-pointer
		disabled:border-z0;
	}
</style>
