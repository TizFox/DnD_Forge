<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
	import AreaInput from "$lib/baseComponents/AreaInput.svelte";
	import TextInput from "$lib/baseComponents/TextInput.svelte";
	import Attack from "$lib/baseComponents/Attack.svelte";

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

<BaseContainer extraClasses="{wClass} flex flex-col items-center gap-3">
	<AreaInput
		{wClass}
		title="Actions"
		value={character.info.actions}
		onChange={(s: string) => {
			character.info.actions = s;
		}}
	/>

	<div class="w-full flex flex-col gap-1">
		<div class="flex">
			<TextInput
				wClass="flex-2"
				rClass="rounded-l-lg"
				value={newAttackName}
				placeholder="New Attack Name"
				onChange={(a: string) => {
					newAttackName = a;
				}}
			/>
			<button
				onclick={() => {
					character.addAttack(newAttackName);
					newAttackName = "";
				}}
				disabled={newAttackName === ""}
				class="std-btn rounded-l-none flex-1"
			>
				ADD
			</button>
		</div>

		{#each attackNames as name}
			<Attack {character} attackName={name} />
		{/each}
	</div>
</BaseContainer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
