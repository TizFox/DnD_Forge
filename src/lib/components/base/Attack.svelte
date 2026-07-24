<script lang="ts">
	import { Trash2, Eye, EyeOff, BookOpenCheck } from "@lucide/svelte";

	import { ALL_ABILITIES } from "$lib/types";
	import type { Character } from "$lib/character.svelte";

    import { lockInput } from "$lib/global.svelte";

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

	let attackMod = $derived(character.getAttackModifier(attack.name));
</script>

<!------------------------------------------>

<div class="{wClass} attack-container">
	<div class="attack-header">
		<div class="attack-info">
			<div class="w-full flex items-center justify-between">
				<h3 class="h-fit main-text">{attack.name}</h3>
				<button
					onclick={() => (showBody = !showBody)}
					class="base-button w-1/3 rounded-b-none"
				>
					{#if showBody}
						<EyeOff />
					{:else}
						<Eye />
					{/if}
				</button>
			</div>

			<div class="attack-subinfo">
				<span class="flex-1 base-border rounded-l-lg">
					TpC: {#if attackMod > 0}+{/if}{attackMod}
				</span>

				<span class="flex-2 base-border">
					{#if attack.damage !== ""}
						{attack.damage}
					{:else}
						<span class="place-text">Damage</span>
					{/if}
				</span>
				<span class="flex-1 base-border rounded-br-lg">
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
					bind:checked={attack.proficient}
					rClass="rounded-tl-lg"
				/>
				<select
					bind:value={attack.ability}
					disabled={lockInput()}
					class="attack-ability-select"
				>
					{#each ALL_ABILITIES as a}
						<option value={a}>{a.toUpperCase()}</option>
					{/each}
				</select>
				<NumberInput
					bind:value={attack.bonusTpC}
					wClass="flex-1"
					rClass="rounded-tr-lg"
				/>
			</div>

			<TextInput
				bind:value={attack.damage}
				rClass="rounded-none"
				placeholder="Attack Damage"
			/>
			<TextInput
				bind:value={attack.range}
				rClass="rounded-bl-lg"
				placeholder="Attack Range"
			/>

			<button
				onclick={() => character.removeAttack(attack.name)}
				class="base-button w-1/2 rounded-t-none"
				disabled={lockInput()}
			>
				<Trash2 />
			</button>
		</div>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.attack-container {
		@apply bg-z2 half-p
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
	}

	.attack-body {
		@apply flex flex-col items-end;

		.attack-ability-select {
			@apply flex-1 h-8 base-px bg-z2 text-left
			base-border
			base-transition
			focus:border-cta
			focus:outline-none
			focus:shadow-none
			disabled:border-z0;
		}
	}
</style>
