export type Alignemts = {
	morality: "good" | "neutral" | "evil";
	order: "lawful" | "neutral" | "chaoric";
};
export type coins = "cp" | "sp" | "ep" | "gp" | "pp";

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
type Ability<T extends string> = {
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

// Character
export interface Character {
	metadata: {
		fileName: string;
		player: string;
	};

	characterInfo: {
		name: string;
		background: string;
		alignment: Alignemts;

		personalityTraits: string;
		ideals: string;
		bonds: string;
		flaws: string;

		description: string;
		backstory: string;
	};

	class: string;
	race: string;
	speed: number;
	initialive: number;
	level: number;
	ca: number;

	stats: { [Ab in AbilitiesEnum]: Ability<SkillsEnum[Ab]> };

	hp: {
		current: number;
		max: number;
		temp: number;
	};

	features: {
		proficiencies: string;
		languages: string;
		raceTraits: string;
		classTraits: string;
	};

	equipment: {
		coins: { [key in coins]: number };
		inventory: string;
		weapons: Weapon[];
	};

	magic: {
		spells: Spell[];
	};
}

interface Weapon {}
interface Spell {}
