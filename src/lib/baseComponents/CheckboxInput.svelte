<script lang="ts">
	type CheckboxInputPropsType = {
		visible?: boolean;
		checked: boolean;
		onChange: (b: boolean) => void;
	};

	let {
		visible = true,
		checked,
		onChange,
	}: CheckboxInputPropsType = $props();
</script>

<!------------------------------------------>

<!--
		isSaveThrow
			? character.setAbilityProficiency(ability, e.currentTarget.checked)
			: character.setSkillProficiency(
					ability,
					skill,
					e.currentTarget.checked,
				)}-->

<input
	class="checkbox-input {visible ? '' : 'invisible'}"
	{checked}
	onchange={(e) => {
		onChange(e.currentTarget.checked);
	}}
	type="checkbox"
/>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.checkbox-input {
		@apply w-8 h-8 appearance-none
		bg-z2 border-2 border-dark
		transition-std rounded-lg
		checked:bg-cta checked:border-cta;
	}
</style>
