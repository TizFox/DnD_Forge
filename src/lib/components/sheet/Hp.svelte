<script lang="ts">
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";
	import { Heart, Skull } from "@lucide/svelte";

	import { Character } from "$lib/character.svelte";
	import { DEATH_TS_TYPES, type DeathTS } from "$lib/types";

	import Container from "$lib/components/base/Container.svelte";
	import Value from "$lib/components/base/Value.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import CheckboxInput from "$lib/components/base/CheckboxInput.svelte";

	type HpPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: HpPropsType = $props();

	const iconMap: Record<DeathTS, Component<IconProps>> = {
		success: Heart,
		failure: Skull,
	} as const;
	const roundedDeathTS: Array<string> = [
		"rounded-l-lg",
		"",
		"rounded-r-lg",
	] as const;
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} flex flex-col gap-3">
	<div class="hp-multi">
		<NumberInput
			title="max hp"
			value={character.hp.max}
			minValue={1}
			onChange={(n: number) => (character.hp.max = n)}
		/>

		<NumberInput
			title="temp hp"
			value={character.hp.temp}
			onChange={(n: number) => (character.hp.temp = n)}
		/>
	</div>

	<NumberInput
		title="current hp"
		value={character.hp.current}
		maxValue={character.hp.max}
		onChange={(n: number) => (character.hp.current = n)}
	/>

	<div class="hp-multi">
		<div class="hp-item">
			<span class="main-text">HIT DICE</span>
			<div class="hp-multi">
				<Value pClass="p-0" value={character.hp.hitDice.max} />

				<p class="font-bold">d</p>

				<NumberInput
					value={character.hp.hitDice.type}
					onChange={(n: number) => (character.hp.hitDice.type = n)}
				/>
			</div>
			<NumberInput
				value={character.hp.hitDice.spent}
				maxValue={character.hp.hitDice.max}
				onChange={(n: number) => (character.hp.hitDice.spent = n)}
			></NumberInput>
		</div>

		<div class="hp-item">
			<span class="main-text">DEATH TS</span>

			{#each DEATH_TS_TYPES as type}
				{@const Icon = iconMap[type]}
				<div class="w-full flex items-center">
					<Icon class="text-cta mr-1" />

					{#each character.hp.deathTS[type] as _, idx}
						<CheckboxInput
							wClass="flex-1"
							rClass={roundedDeathTS[idx]}
							bind:checked={character.hp.deathTS[type][idx]}
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.hp-multi {
		@apply flex-1
		flex items-center justify-center gap-3;
	}
	.hp-item {
		@apply w-full
		flex flex-col items-center gap-1;
	}
</style>
