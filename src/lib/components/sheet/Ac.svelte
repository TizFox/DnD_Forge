<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import Value from "$lib/components/base/Value.svelte";
	import CheckboxInput from "$lib/components/base/CheckboxInput.svelte";

	type AcPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: AcPropsType = $props();
</script>

<!------------------------------------------>

<Container extraClasses={wClass}>
	<div class="flex flex-col gap-3">
		<div class="flex">
			<NumberInput
				bind:value={character.info.initiative}
				wClass="flex-1"
				rClass="rounded-l-lg"
				title={m.ac_initiative()}
			/>

			<Value
				value={(character.info.armor.worn
					? character.info.armor.value
					: 0) +
					(character.info.shield.worn
						? character.info.shield.value
						: 0)}
				wClass="flex-1"
				rClass=""
				title={m.ac_ac()}
			/>

			<NumberInput
				bind:value={character.info.speed}
				decimal={true}
				wClass="flex-1"
				rClass="rounded-r-lg"
				title={m.ac_speed()}
			/>
		</div>
		<div class="flex">
			<div class="flex-1 flex flex-col">
				<div class="flex justify-between">
					<span class="main-text flex-2">{m.ac_armor()}</span>
					<CheckboxInput
						bind:checked={character.info.armor.worn}
						wClass="flex-1"
						rClass="rounded-tl-lg"
					/>
				</div>
				<NumberInput
					bind:value={character.info.armor.value}
					rClass="rounded-l-lg"
				/>
			</div>

			<div class="flex-1 flex flex-col">
				<div class="flex justify-between">
					<CheckboxInput
						bind:checked={character.info.shield.worn}
						wClass="flex-1"
						rClass="rounded-tr-lg"
					/>
					<span class="main-text flex-2">{m.ac_shield()}</span>
				</div>
				<NumberInput
					bind:value={character.info.shield.value}
					rClass="rounded-r-lg"
				/>
			</div>
		</div>
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
