<script lang="ts">
	import { Character } from "$lib/character.svelte";
	import { getClassNames } from "$lib/classes";

	import BaseContainer from "$lib/baseComponents/BaseContainer.svelte";
	import TextInput from "$lib/baseComponents/TextInput.svelte";
	import NumberInput from "$lib/baseComponents/NumberInput.svelte";
	import Value from "$lib/baseComponents/Value.svelte";
	import Alignment from "$lib/baseComponents/Alignment.svelte";
	import Race from "$lib/baseComponents/Race.svelte";

	type InfoPropsType = {
		wClass?: string;
		character: Character;
	};

	let { wClass = "w-full", character }: InfoPropsType = $props();

	let proficiencyBonus = $derived(character.getProficiencyBonus());
</script>

<!------------------------------------------>

<BaseContainer extraClasses="{wClass} grid grid-cols-2 items-center gap-2">
	<div class="info-section">
		<div class="info-subsection">
			<h3>NAME</h3>
			<span>
				<TextInput
					value={character.info.name}
					placeholder="Character Name"
					onChange={(s: string) => (character.info.name = s)}
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>PLAYER</h3>
			<span>
				<TextInput
					value={character.info.player}
					placeholder="Player Name"
					onChange={(s: string) => (character.info.player = s)}
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>LEVEL</h3>
			<span>
				<NumberInput
					minValue={1}
					value={character.info.level}
					onChange={(n: number) => {
						character.info.level = n;
						character.hp.hitDice.max = n;
					}}
				/>
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
			<h3>BACKGROUND</h3>
			<span>
				<TextInput
					value={character.info.background}
					placeholder="Character Background"
					onChange={(s: string) => (character.info.background = s)}
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
					value={character.info.class}
					placeholder="Character Class"
					suggestions={{
						id: "classesList",
						options: getClassNames(),
					}}
					onChange={(s: string) => (character.info.class = s)}
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
</BaseContainer>

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
