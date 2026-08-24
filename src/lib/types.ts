export type Language = "it" | "en";
export type Localized<T> = Record<Language, T>;

export enum CoinEnum {
	CP = "equipment_cp",
	SP = "equipment_sp",
	EP = "equipment_ep",
	GP = "equipment_gp",
	PP = "equipment_pp",
}

export enum DeathTsEnum {
	Success = "success",
	Failure = "failure",
}

// Alignments
export enum MoralityEnum {
	Good = "morality_good",
	Neutral = "morality_neutral",
	Evil = "morality_evil",
}
export enum OrderEnum {
	Lawful = "order_lawful",
	Neutral = "order_neutral",
	Chaotic = "order_chaotic",
}
export type Alignments = {
	morality: MoralityEnum;
	order: OrderEnum;
};

// Classes
export enum ClassEnum {
	Artificer = "class_artificer",
	Barbarian = "class_barbarian",
	Bard = "class_bard",
	Cleric = "class_cleric",
	Druid = "class_druid",
	Fighter = "class_fighter",
	Monk = "class_monk",
	Paladin = "class_paladin",
	Ranger = "class_ranger",
	Rogue = "class_rogue",
	Sorcerer = "class_sorcerer",
	Warlock = "class_warlock",
	Wizard = "class_wizard",
}

// Sizes
export enum SizeEnum {
	Tiny = "size_tiny",
	Small = "size_small",
	Medium = "size_medium",
	Large = "size_large",
	Huge = "size_huge",
	Gargantuan = "size_gargantuan",
}
export const SIZES_ELUSION: Record<SizeEnum, number> = {
	[SizeEnum.Tiny]: +4,
	[SizeEnum.Small]: +1,
	[SizeEnum.Medium]: 0,
	[SizeEnum.Large]: -1,
	[SizeEnum.Huge]: -2,
	[SizeEnum.Gargantuan]: -4,
};

// Abilities
export enum AbilityEnum {
	Strength = "ability_strength",
	Dexterity = "ability_dexterity",
	Constitution = "ability_constitution",
	Intelligence = "ability_intelligence",
	Wisdom = "ability_wisdom",
	Charisma = "ability_charisma",
}

// Skills
export enum SkillEnum {
	Athletics = "skill_athletics",
	Acrobatics = "skill_acrobatics",
	SleightOfHand = "skill_sleight_of_hand",
	Stealth = "skill_stealth",
	Arcana = "skill_arcana",
	History = "skill_history",
	Investigation = "skill_investigation",
	Nature = "skill_nature",
	Religion = "skill_religion",
	AnimalHandling = "skill_animal_handling",
	Insight = "skill_insight",
	Medicine = "skill_medicine",
	Perception = "skill_perception",
	Survival = "skill_survival",
	Deception = "skill_deception",
	Intimidation = "skill_intimidation",
	Performance = "skill_performance",
	Persuasion = "skill_persuasion",
}

export const ABILITY_SKILLS: Record<AbilityEnum, SkillEnum[]> = {
	[AbilityEnum.Strength]: [SkillEnum.Athletics],
	[AbilityEnum.Dexterity]: [SkillEnum.Acrobatics, SkillEnum.SleightOfHand, SkillEnum.Stealth],
	[AbilityEnum.Constitution]: [],
	[AbilityEnum.Intelligence]: [SkillEnum.Arcana, SkillEnum.History, SkillEnum.Investigation, SkillEnum.Nature, SkillEnum.Religion],
	[AbilityEnum.Wisdom]: [SkillEnum.AnimalHandling, SkillEnum.Insight, SkillEnum.Medicine, SkillEnum.Perception, SkillEnum.Survival],
	[AbilityEnum.Charisma]: [SkillEnum.Deception, SkillEnum.Intimidation, SkillEnum.Performance, SkillEnum.Persuasion],
};
export type SkillsType = {
	[Ab in AbilityEnum]: (typeof ABILITY_SKILLS)[Ab][number];
};

export type Ability<Ab extends AbilityEnum> = {
	value: number;
	proficiency: boolean; // => +proficiencyBonus
	skills: Record<SkillsType[Ab], Skill>;
};
export type Skill = {
	proficiency: boolean; // => +proficiencyBonus
	expertise: boolean; // => +proficiencyBonus (again)
};

// Equipment
export interface Attack {
	name: string;
	ability: AbilityEnum;
	proficient: boolean;
	bonusTpC: number;
	damage: string;
	range: string;
}
export const getEmptyAttack = (name: string): Attack => {
	return {
		name: name,
		ability: AbilityEnum.Strength,
		proficient: false,
		bonusTpC: 0,
		damage: "",
		range: "",
	};
};

// Spellcasting
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
