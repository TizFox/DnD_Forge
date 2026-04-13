import type { Character, AbilitiesEnum, SkillsEnum } from "./types";

// Character
export function getProficiencyBonus(character: Character): number {
	console.log(`getProficiencyBonus()`);
	return Math.floor((character.level - 1) / 4) + 2;
}

export function getPassivePerception(character: Character): number {
	console.log(`getPassivePerception()`);
	return (
		10 +
		getAbilityModifier({ character, ability: "wisdom" }) +
		(getAbilityProficiency({ character, ability: "wisdom" })
			? getProficiencyBonus(character)
			: 0)
	);
}

export function createNewCharacter(): Character {
	let char: Character = {
		info: {
			player: "",
			name: "",
			background: "",
			alignment: { morality: "neutral", order: "neutral" },

			personalityTraits: "",
			ideals: "",
			bonds: "",
			flaws: "",

			description: {
				age: 0,
				height: 0,
				weight: 0,
				eyeColor: "",
				skinColor: "",
				hairColor: "",
				other: "",
			},
			backstory: "",
		},

		class: "",
		race: "",
		speed: 0,
		initiative: 0,
		level: 1,
		ca: 0,

		stats: {
			strength: {
				value: 8,
				proficiency: false,
				skills: {
					athletics: { proficiency: false, expertise: false },
				},
			},
			dexterity: {
				value: 8,
				proficiency: false,
				skills: {
					acrobatics: { proficiency: false, expertise: false },
					sleight_of_hand: { proficiency: false, expertise: false },
					stealth: { proficiency: false, expertise: false },
				},
			},
			constitution: {
				value: 8,
				proficiency: false,
				skills: {},
			},
			intelligence: {
				value: 8,
				proficiency: false,
				skills: {
					arcana: { proficiency: false, expertise: false },
					history: { proficiency: false, expertise: false },
					investigation: { proficiency: false, expertise: false },
					nature: { proficiency: false, expertise: false },
					religion: { proficiency: false, expertise: false },
				},
			},
			wisdom: {
				value: 8,
				proficiency: false,
				skills: {
					animal_handling: { proficiency: false, expertise: false },
					insight: { proficiency: false, expertise: false },
					medicine: { proficiency: false, expertise: false },
					perception: { proficiency: false, expertise: false },
					survival: { proficiency: false, expertise: false },
				},
			},
			charisma: {
				value: 8,
				proficiency: false,
				skills: {
					deception: { proficiency: false, expertise: false },
					intimidation: { proficiency: false, expertise: false },
					performance: { proficiency: false, expertise: false },
					persuasion: { proficiency: false, expertise: false },
				},
			},
		},

		hp: {
			current: 0,
			max: 0,
			temp: 0,
		},

		features: {
			proficiencies: "",
			languages: "",
			raceTraits: "",
			classTraits: "",
		},

		equipment: {
			coins: {
				cp: 0,
				sp: 0,
				ep: 0,
				gp: 0,
				pp: 0,
			},
			inventory: "",
			weapons: [],
		},

		magic: {
			spells: [],
		},
	};

	return char;
}

// Abilities
type AbilitySelector = {
	character: Character;
	ability: AbilitiesEnum;
};

export function getAbilityValue(as: AbilitySelector): number {
	console.log(`getAbilityValue(${as.ability})`);
	return as.character.stats[as.ability].value;
}
export function getAbilityModifier(as: AbilitySelector): number {
	console.log(`getAbilityModifier(${as.ability})`);
	return Math.floor((as.character.stats[as.ability].value - 10) / 2);
}

export function getAbilitySaveThrow(as: AbilitySelector): number {
	console.log(`getAbilitySaveThrow(${as.ability})`);
	return (
		getAbilityModifier(as) +
		(as.character.stats[as.ability].proficiency
			? getProficiencyBonus(as.character)
			: 0)
	);
}

export function getAbilityProficiency(as: AbilitySelector): boolean {
	console.log(`getAbilityProficiency(${as.ability})`);
	return as.character.stats[as.ability].proficiency;
}
export function setAbilityProficiency(as: AbilitySelector, val: boolean): void {
	console.log(`setAbilityProficiency(${as.ability}, ${val})`);
	as.character.stats[as.ability].proficiency = val;
}

// Skills
type SkillSelector<Ab extends AbilitiesEnum> = {
	character: Character;
	ability: Ab;
	skill: SkillsEnum[Ab];
};

export function getSkillProficiency<Ab extends AbilitiesEnum>(
	sk: SkillSelector<Ab>,
): boolean {
	console.log(`getSkillProficiency(${sk.ability}, ${sk.skill})`);
	return (
		sk.character.stats[sk.ability].skills[sk.skill]?.proficiency ?? false
	);
}
export function setSkillProficiency<Ab extends AbilitiesEnum>(
	sk: SkillSelector<Ab>,
	val: boolean,
): void {
	console.log(`setSkillProficiency(${sk.ability}, ${sk.skill}, ${val})`);
	sk.character.stats[sk.ability].skills[sk.skill].proficiency = val;

	if (!val) {
		setSkillExpertise(sk, false);
	}
}

export function getSkillExpertise<Ab extends AbilitiesEnum>(
	sk: SkillSelector<Ab>,
): boolean {
	console.log(`getSkillExpertise(${sk.ability}, ${sk.skill})`);
	return sk.character.stats[sk.ability].skills[sk.skill]?.expertise ?? false;
}
export function setSkillExpertise<Ab extends AbilitiesEnum>(
	sk: SkillSelector<Ab>,
	val: boolean,
): void {
	console.log(`setSkillProficiency(${sk.ability}, ${sk.skill}, ${val})`);
	sk.character.stats[sk.ability].skills[sk.skill].expertise = val;

	if (val) {
		setSkillProficiency(sk, true);
	}
}

export function getSkillValue<Ab extends AbilitiesEnum>(
	sk: SkillSelector<Ab>,
): number {
	console.log(`getSkillValue(${sk.ability}, ${sk.skill})`);
	return (
		getAbilityModifier({ character: sk.character, ability: sk.ability }) +
		(getSkillProficiency(sk) ? getProficiencyBonus(sk.character) : 0) +
		(getSkillExpertise(sk) ? getProficiencyBonus(sk.character) : 0)
	);
}
