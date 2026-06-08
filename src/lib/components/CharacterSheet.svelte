<script lang="ts">
	import type { Character } from "$lib/character.svelte";

	// 1-2-3
	import Info from "$lib/components/sheet/Info.svelte";

	// 1
	import Stats from "$lib/components/sheet/Stats.svelte";

	// 2
	import Ca from "$lib/components/sheet/Ca.svelte";
	import Hp from "$lib/components/sheet/Hp.svelte";
	import Actions from "$lib/components/sheet/Actions.svelte";
	import Passive from "$lib/components/sheet/Passive.svelte";
	import Equipment from "$lib/components/sheet/Equipment.svelte";

	// 3
	import Features from "$lib/components/sheet/Features.svelte";
	import Characteristics from "$lib/components/sheet/Characteristics.svelte";
	import Description from "$lib/components/sheet/Description.svelte";

	// 2-3
	import Spellcasting from "$lib/components/sheet/Spellcasting.svelte";

	let { character }: { character: Character } = $props();

	$effect(() => {
		// Set Class Color
		document.documentElement.style.setProperty(
			"--color-cta",
			character.info.color,
		);
	});
</script>

<!------------------------------------------>

<Info {character} />
<div class="w-full flex gap-5">
	<Stats wClass="flex-1" {character} />
	<div class="flex-2 grid grid-cols-2 gap-5">
		<div class="flex flex-col gap-5">
			<Ca {character} />
			<Hp {character} />
			<Actions {character} />
			<Description {character} />
		</div>
		<div class="flex flex-col gap-5">
			<Passive {character} />
			<Equipment {character} />
			<Characteristics {character} />
		</div>
		<Features wClass="col-span-2" {character} />
		<Spellcasting wClass="col-span-2" {character} />
	</div>
</div>
<p>{JSON.stringify(character)}</p>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
