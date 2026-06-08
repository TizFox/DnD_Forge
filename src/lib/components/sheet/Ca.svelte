<script lang="ts">
	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import Value from "$lib/components/base/Value.svelte";
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
		<div class="flex">
			<NumberInput
				wClass="flex-1"
				rClass="rounded-l-lg"
				title="initiative"
				bind:value={character.info.initiative}
			/>

			<Value
				wClass="flex-1"
				rClass=""
				title="ca"
				value={(character.info.armor.worn
					? character.info.armor.value
					: 0) +
					(character.info.shield.worn
						? character.info.shield.value
						: 0)}
			/>

			<NumberInput
				wClass="flex-1"
				rClass="rounded-r-lg"
				title="speed"
				bind:value={character.info.speed}
				decimal={true}
			/>
		</div>
		<div class="flex">
			<div class="flex-1 flex flex-col">
				<div class="flex justify-between">
					<span class="main-text flex-2">ARMOR</span>
					<CheckboxInput
						wClass="flex-1"
						rClass="rounded-tl-lg"
						bind:checked={character.info.armor.worn}
					/>
				</div>
				<NumberInput
					rClass="rounded-l-lg"
					bind:value={character.info.armor.value}
				/>
			</div>

			<div class="flex-1 flex flex-col">
				<div class="flex justify-between">
					<CheckboxInput
						wClass="flex-1"
						rClass="rounded-tr-lg"
						bind:checked={character.info.shield.worn}
					/>
					<span class="main-text flex-2">SHIELD</span>
				</div>
				<NumberInput
					rClass="rounded-r-lg"
					bind:value={character.info.shield.value}
				/>
			</div>
		</div>
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
