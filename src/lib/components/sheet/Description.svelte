<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import TextInput from "$lib/components/base/TextInput.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";

	type DescriptionPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: DescriptionPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} grid grid-cols-2 gap-3">
	<NumberInput
		bind:value={character.info.description.age}
		title="age"
	/>
	<NumberInput
		bind:value={character.info.description.height}
		title="height (cm)"
	/>
	<NumberInput
		bind:value={character.info.description.weight}
		title="weight (kg)"
	/>
	<TextInput
		bind:value={character.info.description.eyeColor}
		title="eye color"
	/>
	<TextInput
		bind:value={character.info.description.skinColor}
		title="skin color"
	/>
	<TextInput
		bind:value={character.info.description.hairColor}
		title="hair color"
	/>
	<AreaInput
		bind:value={character.info.description.other}
		wClass="col-span-2"
		title="other"
	/>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
