<script lang="ts">
	import { Character } from "$lib/character.svelte";

	type StatsPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-fit", character }: StatsPropsType = $props();
</script>

<!------------------------------------------>

<div
	class="{wClass} h-fit p-3 bg-z1
		flex flex-col items-center justify-center gap-3
		rounded-xl"
>
	<h2 class="main-text">HP</h2>
	<div class="w-full flex flex-row items-center justify-center gap-3">
		<div class="flex flex-col items-center">
			<span>MAX</span>
			<input
				bind:value={character.hp.max}
				class="w-full std-input text-center no-spinner"
				defaultValue={character.hp.max}
				type="number"
			/>
		</div>
		<div class="flex flex-col items-center">
			<span>TEMP</span>
			<input
				bind:value={character.hp.temp}
				class="w-full std-input text-center no-spinner"
				defaultValue={character.hp.temp}
				type="number"
			/>
		</div>
	</div>

	<div class="w-full flex flex-col items-center">
		<span>CURRENT</span>
		<input
			bind:value={character.hp.current}
			onchange={() =>
				(character.hp.current =
					character.hp.current > character.hp.max
						? character.hp.max
						: character.hp.current)}
			class="w-full std-input text-center no-spinner"
			defaultValue={character.hp.current}
			type="number"
		/>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.hp-container {
	}

	.hp-current {
	}

	.hp-other {
	}
</style>
