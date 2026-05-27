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
		title="age"
		value={character.info.description.age}
		onChange={(n: number) => {
			character.info.description.age = n;
		}}
	/>
	<NumberInput
		title="height (cm)"
		value={character.info.description.height}
		onChange={(n: number) => {
			character.info.description.height = n;
		}}
	/>
	<NumberInput
		title="weight (kg)"
		value={character.info.description.weight}
		onChange={(n: number) => {
			character.info.description.weight = n;
		}}
	/>
	<TextInput
		title="eye color"
		value={character.info.description.eyeColor}
		onChange={(s: string) => {
			character.info.description.eyeColor = s;
		}}
	/>
	<TextInput
		title="skin color"
		value={character.info.description.skinColor}
		onChange={(s: string) => {
			character.info.description.skinColor = s;
		}}
	/>
	<TextInput
		title="hair color"
		value={character.info.description.hairColor}
		onChange={(s: string) => {
			character.info.description.hairColor = s;
		}}
	/>
	<AreaInput
		wClass="col-span-2"
		title="other"
		value={character.info.description.other}
		onChange={(s: string) => {
			character.info.description.other = s;
		}}
	/>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
