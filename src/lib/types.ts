export enum Morality {
	Good = "good",
	Neutral = "neutral",
	Evil = "evil",
}
export enum Order {
	Lawful = "lawful",
	Neutral = "neutral",
	Chaotic = "chaotic",
}
export type Alignments = {
	morality: Morality;
	order: Order;
};
export enum Sizes {
	Tiny = "Tiny",
	Small = "Small",
	Medium = "Medium",
	Large = "Large",
	Huge = "Huge",
	Gargantuan = "Gargantuan",
}
export const SIZES_ELUSION: Record<Sizes, number> = {
	Tiny: +4,
	Small: +1,
	Medium: 0,
	Large: -1,
	Huge: -2,
	Gargantuan: -4,
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
