<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";

	type FeaturesPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: FeaturesPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col gap-3">
	<AreaInput
		bind:value={
			character.features.class_traits
		}
		title={m.features_class_traits()}
	/>
	<AreaInput
		bind:value={
			character.features.subclass_traits
		}
		title={m.features_subclass_traits()}
	/>
	<AreaInput
		bind:value={
			character.features.race_and_background_traits
		}
		title={m.features_race_and_background_traits()}
	/>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
