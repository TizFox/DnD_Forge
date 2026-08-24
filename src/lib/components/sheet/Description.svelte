<script lang="ts">
	import * as m from "$lib/paraglide/messages";

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
		title={m.description_age()}
	/>
	<NumberInput
		bind:value={character.info.description.height}
		title={m.description_height()}
	/>
	<NumberInput
		bind:value={character.info.description.weight}
		title={m.description_weight()}
	/>
	<TextInput
		bind:value={character.info.description.eyeColor}
		title={m.description_eyes()}
	/>
	<TextInput
		bind:value={character.info.description.skinColor}
		title={m.description_skin()}
	/>
	<TextInput
		bind:value={character.info.description.hairColor}
		title={m.description_hair()}
	/>
	<AreaInput
		bind:value={character.info.description.other}
		wClass="col-span-2"
		title={m.description_other()}
	/>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
