<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";
	import { Heart, Skull } from "@lucide/svelte";

	import { Character } from "$lib/character.svelte";
	import { DeathTsEnum } from "$lib/types";

	import Container from "$lib/components/base/Container.svelte";
	import Value from "$lib/components/base/Value.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import CheckboxInput from "$lib/components/base/CheckboxInput.svelte";

	type HpPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: HpPropsType = $props();

	const iconMap: Record<DeathTsEnum, Component<IconProps>> = {
		[DeathTsEnum.Success]: Heart,
		[DeathTsEnum.Failure]: Skull,
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
			bind:value={character.hp.max}
			minValue={1}
			title={m.hp_max()}
		/>

		<NumberInput
			bind:value={character.hp.temp}
			title={m.hp_temporary()}
		/>
	</div>

	<NumberInput
		bind:value={character.hp.current}
		maxValue={character.hp.max}
		title={m.hp_current()}
	/>

	<div class="hp-multi">
		<div class="hp-item">
			<span class="main-text">{m.hp_hit_dice()}</span>
			<div class="hp-multi">
				<Value value={character.info.level} pClass="p-0" />

				<p class="font-bold">d</p>

				<NumberInput
					bind:value={character.hp.hitDice.type}
				/>
			</div>
			<NumberInput
				bind:value={character.hp.hitDice.spent}
				maxValue={character.info.level}
			/>
		</div>

		<div class="hp-item">
			<span class="main-text">{m.hp_death_throws()}</span>

			{#each Object.values(DeathTsEnum) as type}
				{@const Icon = iconMap[type]}
				<div class="w-full flex items-center">
					<Icon class="text-cta mr-1" />

					{#each character.hp.deathTS[type] as _, idx}
						<CheckboxInput
							bind:checked={character.hp.deathTS[type][idx]}
							wClass="flex-1"
							rClass={roundedDeathTS[idx]}
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
