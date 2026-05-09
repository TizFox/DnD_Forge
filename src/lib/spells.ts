import type { Spell, SpellLevels, SpellSchools } from "./types";
import { EMPTY_SPELL } from "./types";

import ALL_SPELLS from "$lib/spells/spells.json";

export const getSpell = (name: string): Spell | null => {
	let spell: Spell = EMPTY_SPELL;

	let filteredSpells = ALL_SPELLS.filter(
		(x) => x.Name.toUpperCase() == name.toUpperCase(),
	);

	if (filteredSpells.length == 0) {
		return null;
	}
	let fSpell = filteredSpells[0];

	spell.manual = fSpell["Source"] + " (Page " + fSpell["Page"] + ")";
	spell.name = fSpell["Name"];
	spell.level = (
		fSpell["Level"] == "Cantrip" ? 0 : +fSpell["Level"][0]
	) as SpellLevels;
	spell.school = fSpell["School"] as SpellSchools;
	spell.castingTime = fSpell["Casting Time"];
	spell.range = fSpell["Range"];
	spell.components = fSpell["Components"];
	spell.duration = fSpell["Duration"];
	spell.description = fSpell["Text"];
	spell.higherLevels = fSpell["At Higher Levels"];

	return spell;
};

export const getSpellNames = (): string[] => {
	return ALL_SPELLS.map((s) => s.Name);
};
