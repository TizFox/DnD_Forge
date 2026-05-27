<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import CheckboxInput from "$lib/components/base/CheckboxInput.svelte";

	type CaPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: CaPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses={wClass}>
	<div class="flex flex-col gap-3">
		<div class="flex gap-1">
			<NumberInput
				title="initiative"
				value={character.info.initiative}
				onChange={(n: number) => (character.info.initiative = n)}
			/>

			<NumberInput
				title="ca"
				value={character.info.ca +
					(character.info.shield.worn
						? character.info.shield.value
						: 0)}
				onChange={(n: number) => (character.info.ca = n)}
			/>

			<NumberInput
				title="speed"
				value={character.info.speed}
				onChange={(n: number) => (character.info.speed = n)}
			/>
		</div>
		<div class="w-full flex flex-col">
			<span class="main-text">SHIELD</span>
			<div class="flex">
				<NumberInput
					wClass="flex-6"
					rClass="rounded-l-lg"
					value={character.info.shield.value}
					onChange={(n: number) => (character.info.shield.value = n)}
				/>
				<CheckboxInput
					wClass="flex-1"
					rClass="rounded-r-lg"
					bind:checked={character.info.shield.worn}
				/>
			</div>
		</div>
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
