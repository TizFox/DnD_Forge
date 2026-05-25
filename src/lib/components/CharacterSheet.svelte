<script lang="ts">
	import { saveCharacter } from "$lib/supabase";
	import { getColor } from "$lib/classes";

	import type { Character } from "$lib/character.svelte";

	// 1-2-3
	import Info from "$lib/components/Info.svelte";

	// 1
	import Stats from "$lib/components/Stats.svelte";

	// 2
	import Ca from "$lib/components/Ca.svelte";
	import Hp from "$lib/components/Hp.svelte";
	import Actions from "$lib/components/Actions.svelte";
	import Passive from "$lib/components/Passive.svelte";
	import Equipment from "$lib/components/Equipment.svelte";

	// 3
	import Features from "$lib/components/Features.svelte";
	import Characteristics from "$lib/components/Characteristics.svelte";
	import Description from "$lib/components/Description.svelte";

	// 2-3
	import Spellcasting from "$lib/components/Spellcasting.svelte";

	let {
		user,
		id,
		character,
	}: {
		user?: string;
		id?: string;
		character: Character;
	} = $props();

	const handleSave = async () => {
		if (user && id) {
			await saveCharacter(user, id, character);
		}
	};

	let autoSave: ReturnType<typeof setTimeout>;
	$effect(() => {
		// Save 1.5s after last edit
		$state.snapshot(character);
		clearTimeout(autoSave);
		autoSave = setTimeout(handleSave, 1500);

		// Set Class Color
		document.documentElement.style.setProperty(
			"--color-cta",
			getColor(character.info.class),
		);
	});
</script>

<!------------------------------------------>

<Info {character} />
<div class="w-full flex gap-5">
	<Stats wClass="flex-1" {character} />
	<div class="flex-2 grid grid-cols-2 auto-rows-fr gap-5">
		<div class="flex flex-col gap-5">
			<Ca {character} />
			<Hp {character} />
			<Actions {character} />
			<Passive {character} />
			<Equipment {character} />
		</div>
		<div class="flex flex-col gap-5">
			<Features {character} />
			<Characteristics {character} />
			<Description {character} />
		</div>
		<Spellcasting wClass="col-span-2" {character} />
	</div>
</div>
<p>{JSON.stringify(character)}</p>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
