export type Alignemts = {
	morality: "good" | "neutral" | "evil";
	order: "lawful" | "neutral" | "chaoric";
};
export type CoinsEnum = "cp" | "sp" | "ep" | "gp" | "pp";

// Abilities
export type AbilitiesEnum =
	| "strength"
	| "dexterity"
	| "constitution"
	| "intelligence"
	| "wisdom"
	| "charisma";
export const ALL_ABILITIES: AbilitiesEnum[] = [
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
];
export type Ability<T extends string> = {
	value: number;
	proficiency: boolean; // => +proficiencyBonus
	skills: Record<T, Skill>;
};

// Skills
export type SkillsEnum = {
	strength: "athletics";
	dexterity: "acrobatics" | "sleight_of_hand" | "stealth";
	constitution: never;
	intelligence:
		| "arcana"
		| "history"
		| "investigation"
		| "nature"
		| "religion";
	wisdom:
		| "animal_handling"
		| "insight"
		| "medicine"
		| "perception"
		| "survival";
	charisma: "deception" | "intimidation" | "performance" | "persuasion";
};
export const ALL_SKILLS: { [ab in AbilitiesEnum]: SkillsEnum[ab][] } = {
	strength: ["athletics"],
	dexterity: ["acrobatics", "sleight_of_hand", "stealth"],
	constitution: [],
	intelligence: ["arcana", "history", "investigation", "nature", "religion"],
	wisdom: [
		"animal_handling",
		"insight",
		"medicine",
		"perception",
		"survival",
	],
	charisma: ["deception", "intimidation", "performance", "persuasion"],
};
type Skill = {
	proficiency: boolean; // => +proficiencyBonus
	expertise: boolean; // => +proficiencyBonus (again)
};

export interface Weapon {}
export interface Spell {}
