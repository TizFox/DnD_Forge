<script lang="ts">
	import { Trash2, Eye, EyeOff, BookOpenCheck } from "@lucide/svelte";

	import { ALL_ABILITIES } from "$lib/types";
	import type { Character } from "$lib/character.svelte";

	import CheckboxInput from "./CheckboxInput.svelte";
	import NumberInput from "./NumberInput.svelte";
	import TextInput from "./TextInput.svelte";

	type AttackPropsType = {
		wClass?: string;
		character: Character;
		attackName: string;
	};

	let {
		wClass = "w-full",
		character,
		attackName,
	}: AttackPropsType = $props();

	let attack = $derived(character.equipment.attacks[attackName]);

	let showBody = $state<boolean>(false);
</script>

<!------------------------------------------>

<div class="{wClass} attack-container">
	<div class="attack-header">
		<div class="attack-info">
			<div class="w-full flex items-center justify-between">
				<h3 class="h-fit main-text">{attack.name}</h3>
				<div class="attack-actions">
					<button
						onclick={() => (showBody = !showBody)}
						class="std-btn rounded-none rounded-tl-lg"
					>
						{#if showBody}
							<EyeOff />
						{:else}
							<Eye />
						{/if}
					</button>
					<button
						onclick={() => character.removeAttack(attack.name)}
						class="std-btn rounded-none rounded-tr-lg"
					>
						<Trash2 />
					</button>
				</div>
			</div>

			<div class="attack-subinfo">
				<span class="flex-1 border-dark border-2 rounded-l-lg">
					TpC: {#if character.getAttackModifier(attack.name) > 0}+{/if}{character.getAttackModifier(
						attack.name,
					)}
				</span>

				<span class="flex-2 border-dark border-2">
					{#if attack.damage !== ""}
						{attack.damage}
						{#if attack.bonus !== 0}
							{#if attack.bonus > 0}+{/if}{attack.bonus}
						{/if}
					{:else}
						<span class="place-text">Damage</span>
					{/if}
				</span>
				<span class="flex-1 border-dark border-2 rounded-br-lg">
					{#if attack.range !== ""}
						{attack.range}
					{:else}
						<span class="place-text">Range</span>
					{/if}
				</span>
			</div>
		</div>
	</div>

	{#if showBody}
		<div class="attack-body">
			<div class="flex">
				<CheckboxInput
					rClass="rounded-tl-lg"
					checked={attack.proficient}
					onChange={(b: boolean) => {
						attack.proficient = b;
					}}
				/>
				<select
					class="attack-ability-select"
					bind:value={attack.ability}
				>
					{#each ALL_ABILITIES as a}
						<option value={a}>{a.toUpperCase()}</option>
					{/each}
				</select>
				<NumberInput
					wClass="flex-1"
					rClass="rounded-tr-lg"
					value={attack.bonus}
					onChange={(n: number) => (attack.bonus = n)}
				/>
			</div>

			<TextInput
				rClass="rounded-none"
				value={attack.damage}
				placeholder="Attack Damage"
				onChange={(s: string) => (attack.damage = s)}
			/>
			<TextInput
				rClass="rounded-b-lg"
				value={attack.range}
				placeholder="Attack Range"
				onChange={(s: string) => (attack.range = s)}
			/>
		</div>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.attack-container {
		@apply bg-z2 p-half
		flex flex-col
		rounded-lg;
	}

	.attack-header {
		@apply flex;

		.attack-info {
			@apply flex-5
			flex flex-col items-start justify-center;

			.attack-subinfo {
				@apply w-full
				flex
				text-center;
			}
		}

		.attack-actions {
			@apply flex-1
			flex justify-end;

			.std-btn {
				@apply max-h-none p-half;
			}
		}
	}

	.attack-body {
		.attack-ability-select {
			@apply flex-1 h-8 px-std bg-z2 text-left
			border-2 border-dark
			transition-std
			focus:border-cta
			focus:outline-none
			focus:shadow-none;
		}
	}
</style>
