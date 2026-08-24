<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import { Character } from "$lib/character.svelte";
	import { ClassEnum } from "$lib/types";

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
			<h3>{m.character_name()}</h3>
			<span>
				<TextInput
					bind:value={character.info.name}
					placeholder={m.character_name_placeholder()}
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>{m.character_player()}</h3>
			<span>
				<TextInput
					bind:value={character.info.player}
					placeholder={m.character_player_placeholder()}
				/>
			</span>
		</div>

		<div class="info-subsection">
			<h3>{m.character_level()}</h3>
			<span>
				<NumberInput
					bind:value={character.info.level}
					minValue={1}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>{m.character_proficiency_bonus()}</h3>
			<span>
				<Value value={proficiencyBonus} />
			</span>
		</div>
	</div>

	<div class="info-section">
		<div class="info-subsection">
			<h3>{m.character_campain()}</h3>
			<span>
				<TextInput
					bind:value={character.info.campaign}
					placeholder={m.character_campain_placeholder()}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>{m.character_alignment()}</h3>
			<span>
				<Alignment {character} />
			</span>
		</div>

		<div class="info-subsection">
			<h3>{m.character_class()}</h3>
			<span>
				<TextInput
					bind:value={character.info.class}
					suggestions={{
						id: "classesList",
						options: Object.values(ClassEnum).map((cla: string) => m[cla]()),
					}}
					placeholder={m.character_class_placeholder()}
				/>
			</span>
		</div>
		<div class="info-subsection">
			<h3>RACE</h3>
			<span>
				<Race
					{character}
					placeholder={m.character_race_placeholder()}
				/>
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
