<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { getClassNames } from "$lib/classes";

	import Container from "$lib/components/base/Container.svelte";
	import TextInput from "$lib/components/base/TextInput.svelte";
	import NumberInput from "$lib/components/base/NumberInput.svelte";
	import Value from "$lib/components/base/Value.svelte";
	import Alignment from "$lib/components/base/Alignment.svelte";
	import Race from "$lib/components/base/Race.svelte";

	type InfoPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: InfoPropsType = $props();

	let proficiencyBonus = $derived(character.getProficiencyBonus());
</script>

<!------------------------------------------>

<Container extraClasses="{wClass} grid grid-cols-2 items-center gap-2">
	<div class="info-section">
		<div class="info-subsection">
			<h3>NAME</h3>
			<span>
				<TextInput
					bind:value={character.info.name}
					placeholder="Character Name"
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>PLAYER</h3>
			<span>
				<TextInput
					bind:value={character.info.player}
					placeholder="Player Name"
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>LEVEL</h3>
			<span>
				<NumberInput minValue={1} bind:value={character.info.level} />
			</span>
		</div>
		<div class="info-subsection">
			<h3>P.BONUS</h3>
			<span>
				<Value value={proficiencyBonus} />
			</span>
		</div>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3>CAMPAIGN</h3>
			<span>
				<TextInput
					bind:value={character.info.campaign}
					placeholder="Campaign Name"
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>ALIGNMENT</h3>
			<span>
				<Alignment {character} />
			</span>
		</div>

		<div class="info-subsection">
			<h3>CLASS</h3>
			<span>
				<TextInput
					bind:value={character.info.class}
					placeholder="Character Class"
					suggestions={{
						id: "classesList",
						options: getClassNames(),
					}}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>RACE</h3>
			<span>
				<Race {character} />
			</span>
		</div>
	</div>
</Container>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.info-section {
		@apply flex flex-col items-start gap-2;

		.info-subsection {
			@apply w-full
			flex items-center gap-2;

			h3 {
				@apply flex-1 main-text text-right;
			}
			span {
				@apply flex-3;
			}
		}
	}
</style>
