<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";

	import { NAME } from "$lib/global.svelte";
	import { getCharacter, saveCharacter } from "$lib/supabase";
	import { getColor } from "$lib/classes";

	let { params }: PageProps = $props();
	let user = $derived(params.user);
	let characterId = $derived(params.characterId);

	let loading = $state(true);
	let character = $state<Character | null>(null);
	onMount(async () => {
		let data = await getCharacter(user, characterId);
		if (data) {
			character = Character.from(
				JSON.parse(data.character) as CharacterType,
			);
		}
		loading = false;
	});

	const handleSave = async () => {
		if (!character) {
			return;
		}
		await saveCharacter(user, characterId, character);
	};

	let autoSave: ReturnType<typeof setTimeout>;
	$effect(() => {
		$state.snapshot(character);
		clearTimeout(autoSave);
		autoSave = setTimeout(handleSave, 1500);

		if (!character) {
			document.documentElement.style.setProperty(
				"--color-cta",
				getColor("default"),
			);
			return;
		}
		document.documentElement.style.setProperty(
			"--color-cta",
			getColor(character.info.class),
		);
	});

	import { type CharacterType, Character } from "$lib/character.svelte";

	// full
	import Info from "$lib/components/Info.svelte";

	// 1/3
	import Stats from "$lib/components/Stats.svelte";

	// 2/3
	import Ca from "$lib/components/Ca.svelte";
	import Hp from "$lib/components/Hp.svelte";
	import Actions from "$lib/components/Actions.svelte";
	import Passive from "$lib/components/Passive.svelte";
	import Equipment from "$lib/components/Equipment.svelte";

	// 3/3
	import Features from "$lib/components/Features.svelte";
	import Characteristics from "$lib/components/Characteristics.svelte";
	import Description from "$lib/components/Description.svelte";

	// 2-3/3
	import Spellcasting from "$lib/components/Spellcasting.svelte";

	import Loading from "$lib/components/Loading.svelte";
	import Empty from "$lib/components/Empty.svelte";
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=1280" />
	<title>
		{(character && character.info.name != ""
			? character.info.name + " - "
			: "") + NAME}
	</title>
</svelte:head>

<!------------------------------------------>

{#if loading}
	<Loading />
{:else if character}
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
{:else}
	<Empty msg="CHARACTER NOT FOUND" />
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
