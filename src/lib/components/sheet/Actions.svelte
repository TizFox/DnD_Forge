<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import AreaInput from "$lib/components/base/AreaInput.svelte";
	import TextInput from "$lib/components/base/TextInput.svelte";
	import Attack from "$lib/components/base/Attack.svelte";

	type ActionsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: ActionsPropsType = $props();

	let attackNames = $derived(
		Object.values(character.equipment.attacks).map((a) => a.name),
	);

	let newAttackName = $state("");
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col items-center gap-3">
	<AreaInput
		{wClass}
		title="actions"
		bind:value={character.equipment.actions}
	/>

	<div class="w-full flex flex-col gap-1">
		<div class="flex">
			<TextInput
				wClass="flex-2"
				rClass="rounded-l-lg"
				bind:value={newAttackName}
				placeholder="New Attack Name"
			/>
			<button
				onclick={() => {
					character.addAttack(newAttackName);
					newAttackName = "";
				}}
				disabled={newAttackName === ""}
				class="std-btn flex-1 h-8 rounded-l-none"
			>
				ADD
			</button>
		</div>

		{#if attackNames.length > 0}
			<hr class="my-3" />
		{/if}

		{#each attackNames as name}
			<Attack {character} attackName={name} />
		{:else}
			<h3 class="main-text">NO ATTACKS</h3>
		{/each}
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
