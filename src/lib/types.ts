export type Language = "en" | "it";
export type Localized<T> = Record<Language, T>;

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
} as const;
export type CoinsEnum = "cp" | "sp" | "ep" | "gp" | "pp";

// Abilities
export const ALL_ABILITIES = [
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
] as const;
export type AbilitiesType = (typeof ALL_ABILITIES)[number];

// Skills
export const ALL_SKILLS: Record<AbilitiesType, string[]> = {
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
} as const;
export type SkillsType = {
	[Ab in AbilitiesType]: (typeof ALL_SKILLS)[Ab][number];
};

export type Ability<Ab extends AbilitiesType> = {
	value: number;
	proficiency: boolean; // => +proficiencyBonus
	skills: Record<SkillsType[Ab], Skill>;
};
type Skill = {
	proficiency: boolean; // => +proficiencyBonus
	expertise: boolean; // => +proficiencyBonus (again)
};

// Equipment
export interface Weapon {}

export type SpellLevels = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SpellSchools =
	| "Abjuration"
	| "Conjuration"
	| "Divination"
	| "Enchantment"
	| "Evocation"
	| "Illusion"
	| "Necromancy"
	| "Trasmutation";

export type SpellSlot = {
	level: Exclude<SpellLevels, 0>;
	total: number;
	used: number;
};

export interface Spell {
	manual: string;
	name: string;
	level: SpellLevels;
	school: SpellSchools;
	castingTime: string;
	range: string;
	components: string;
	duration: string;
	description: string;
	higherLevels: string;
}
export const EMPTY_SPELL: Spell = {
	manual: "",
	name: "",
	level: 0,
	school: "Abjuration",
	castingTime: "",
	range: "",
	components: "",
	duration: "",
	description: "",
	higherLevels: "",
};
