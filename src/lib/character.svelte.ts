import {
	CoinEnum,
	DeathTsEnum,
	type Alignments,
	type SkillsType,
	type Ability,
	type Skill,
	type Attack,
	type Spell,
	type SpellSlot,
	MoralityEnum,
	OrderEnum,
	SizeEnum,
	SIZES_ELUSION,
	AbilityEnum,
	SkillEnum,
	getEmptyAttack,
} from "./types";

import { BASE_COLOR } from "./global.svelte";
import { getSpell } from "./spells";

export type CharacterType = InstanceType<typeof Character>;

export class Character {
	info: {
		player: string;
		color: string;
		name: string;
		campaign: string;
		alignment: Alignments;

		class: string;
		race: string;
		size: SizeEnum;
		speed: number;
		initiative: number;
		level: number;
		armor: {
			value: number;
			worn: boolean;
		};
		shield: {
			value: number;
			worn: boolean;
		};

		description: {
			age: number;
			height: number;
			weight: number;
			eyeColor: string;
			skinColor: string;
			hairColor: string;
			other: string;
		};
		characteristics: {
			languages: string;
			personality: string;
			ideals: string;
			bonds: string;
			flaws: string;
			backstory: string;
		};
	};

	hp: {
		current: number;
		max: number;
		temp: number;
		hitDice: {
			type: number;
			spent: number;
		};
		deathTS: Record<DeathTsEnum, [boolean, boolean, boolean]>;
	};

	stats: { [Ab in AbilityEnum]: Ability<Ab> };

	features: {
		class_traits: string;
		subclass_traits: string;
		race_and_background_traits: string;
	};

	equipment: {
		coins: { [coin in CoinEnum]: number };
		inventory: string;
		proficiencies: string;
		actions: string;
		attacks: Record<string, Attack>;
	};

	magic: {
		spellcastingAbility: AbilityEnum;
		bonusTpC: number;
		bonusDC: number;
		spells: Record<string, Spell>;
		spellSlots: SpellSlot[];
	};

	static from(data: CharacterType): Character {
		const char = new Character();

		Object.assign(char.info, data.info);
		Object.assign(char.hp, data.hp);
		Object.assign(char.stats, data.stats);
		Object.assign(char.features, data.features);
		Object.assign(char.equipment, data.equipment);
		Object.assign(char.magic, data.magic);

		return char;
	}
	toJSON() {
		const { info, hp, stats, features, equipment, magic } = this;
		return { info, hp, stats, features, equipment, magic };
	}

	constructor() {
		this.info = $state({
			player: "",
			color: BASE_COLOR,
			name: "New Character",
			campaign: "",
			alignment: { morality: MoralityEnum.Neutral, order: OrderEnum.Neutral },

			class: "",
			race: "",
			size: SizeEnum.Medium,
			speed: 0,
			initiative: 0,
			level: 1,
			armor: {
				value: 0,
				worn: false,
			},
			shield: {
				value: 0,
				worn: false,
			},

			description: {
				age: 0,
				height: 0,
				weight: 0,
				eyeColor: "",
				skinColor: "",
				hairColor: "",
				other: "",
			},
			characteristics: {
				languages: "",
				personality: "",
				ideals: "",
				bonds: "",
				flaws: "",
				backstory: "",
			},
		});
		this.hp = $state({
			current: 0,
			max: 1,
			temp: 0,
			hitDice: {
				type: 0,
				spent: 0,
			},
			deathTS: {
				success: [false, false, false],
				failure: [false, false, false],
			},
		});
		this.stats = $state({
			[AbilityEnum.Strength]: {
				value: 8,
				proficiency: false,
				skills: {
					[SkillEnum.Athletics]: { proficiency: false, expertise: false },
				},
			} as Ability<AbilityEnum.Strength>,
			[AbilityEnum.Dexterity]: {
				value: 8,
				proficiency: false,
				skills: {
					[SkillEnum.Acrobatics]: { proficiency: false, expertise: false },
					[SkillEnum.SleightOfHand]: { proficiency: false, expertise: false },
					[SkillEnum.Stealth]: { proficiency: false, expertise: false },
				},
			} as Ability<AbilityEnum.Dexterity>,
			[AbilityEnum.Constitution]: {
				value: 8,
				proficiency: false,
				skills: {},
			} as Ability<AbilityEnum.Constitution>,
			[AbilityEnum.Intelligence]: {
				value: 8,
				proficiency: false,
				skills: {
					[SkillEnum.Arcana]: { proficiency: false, expertise: false },
					[SkillEnum.History]: { proficiency: false, expertise: false },
					[SkillEnum.Investigation]: { proficiency: false, expertise: false },
					[SkillEnum.Nature]: { proficiency: false, expertise: false },
					[SkillEnum.Religion]: { proficiency: false, expertise: false },
				},
			} as Ability<AbilityEnum.Intelligence>,
			[AbilityEnum.Wisdom]: {
				value: 8,
				proficiency: false,
				skills: {
					[SkillEnum.AnimalHandling]: { proficiency: false, expertise: false },
					[SkillEnum.Insight]: { proficiency: false, expertise: false },
					[SkillEnum.Medicine]: { proficiency: false, expertise: false },
					[SkillEnum.Perception]: { proficiency: false, expertise: false },
					[SkillEnum.Survival]: { proficiency: false, expertise: false },
				},
			} as Ability<AbilityEnum.Wisdom>,
			[AbilityEnum.Charisma]: {
				value: 8,
				proficiency: false,
				skills: {
					[SkillEnum.Deception]: { proficiency: false, expertise: false } as Skill,
					[SkillEnum.Intimidation]: { proficiency: false, expertise: false },
					[SkillEnum.Performance]: { proficiency: false, expertise: false },
					[SkillEnum.Persuasion]: { proficiency: false, expertise: false },
				},
			} as Ability<AbilityEnum.Charisma>,
		});
		this.features = $state({
			class_traits: "",
			subclass_traits: "",
			race_and_background_traits: "",
		});
		this.equipment = $state({
			coins: {
				[CoinEnum.CP]: 0,
				[CoinEnum.SP]: 0,
				[CoinEnum.EP]: 0,
				[CoinEnum.GP]: 0,
				[CoinEnum.PP]: 0,
			},
			inventory: "",
			proficiencies: "",
			actions: "",
			attacks: {},
		});
		this.magic = $state({
			spellcastingAbility: AbilityEnum.Strength,
			bonusTpC: 0,
			bonusDC: 0,
			spells: {},
			spellSlots: [
				{ level: 1, total: 0, used: 0 },
				{ level: 2, total: 0, used: 0 },
				{ level: 3, total: 0, used: 0 },
				{ level: 4, total: 0, used: 0 },
				{ level: 5, total: 0, used: 0 },
				{ level: 6, total: 0, used: 0 },
				{ level: 7, total: 0, used: 0 },
				{ level: 8, total: 0, used: 0 },
				{ level: 9, total: 0, used: 0 },
			],
		});
	}

	getSizeElusion(): number {
		//console.log(`getSizeElusion()`);
		return SIZES_ELUSION[this.info.size];
	}

	getProficiencyBonus(): number {
		//console.log(`getProficiencyBonus()`);
		return Math.floor((this.info.level - 1) / 4) + 2;
	}

	// Abilities
	getAbilityProficiency(ab: AbilityEnum): boolean {
		//console.log(`getAbilityProficiency("${ab}")`);
		return this.stats[ab].proficiency;
	}
	getAbilityValue(ab: AbilityEnum): number {
		//console.log(`getAbilityValue("${ab}")`);
		return this.stats[ab].value;
	}
	getAbilityModifier(ab: AbilityEnum): number {
		//console.log(`getAbilityModifier("${ab}")`);
		return Math.floor((this.getAbilityValue(ab) - 10) / 2);
	}
	getAbilitySaveThrow(ab: AbilityEnum): number {
		//console.log(`getAbilitySaveThrow("${ab}")`);
		return (
			this.getAbilityModifier(ab) +
			(this.getAbilityProficiency(ab) ? this.getProficiencyBonus() : 0)
		);
	}

	// Skills
	getSkillProficiency<Ab extends AbilityEnum>(
		ab: Ab,
		sk: SkillsType[Ab],
	): boolean {
		//console.log(`getSkillProficiency("${ab}", "${sk}")`);
		return this.stats[ab].skills[sk].proficiency ?? false;
	}
	getSkillExpertise<Ab extends AbilityEnum>(
		ab: Ab,
		sk: SkillsType[Ab],
	): boolean {
		//console.log(`getSkillExpertise("${ab}", "${sk}")`);
		return this.stats[ab].skills[sk]?.expertise ?? false;
	}
	getSkillValue<Ab extends AbilityEnum>(
		ab: Ab,
		sk: SkillsType[Ab],
	): number {
		//console.log(`getSkillValue("${ab}", "${sk}")`);
		return (
			this.getAbilityModifier(ab) +
			(this.getSkillProficiency(ab, sk)
				? this.getProficiencyBonus()
				: 0) +
			(this.getSkillExpertise(ab, sk) ? this.getProficiencyBonus() : 0)
		);
	}
	getPassiveSkillValue<Ab extends AbilityEnum>(
		ability: Ab,
		skill: SkillsType[Ab],
	): number {
		//console.log(`getPassivePerception()`);
		return 10 + this.getSkillValue(ability, skill);
	}

	// Attacks
	getAttackModifier(attackName: string): number {
		attackName = attackName.toUpperCase(); // TODO
		const attack: Attack | null = this.equipment.attacks[attackName];
		if (!attack) {
			return -1;
		}

		//console.log(`getAttackModifier("${attackName}")`);
		return (
			this.getAbilityModifier(attack.ability) +
			(attack.proficient ? this.getProficiencyBonus() : 0) +
			(attack.bonusTpC != null ? attack.bonusTpC : 0)
		);
	}
	addAttack(attackName: string): void {
		attackName = attackName.toUpperCase(); // TODO
		//console.log(`addAttack("${attackName}")`);

		this.equipment.attacks[attackName] = getEmptyAttack(attackName);
	}
	removeAttack(attackName: string): void {
		attackName = attackName.toUpperCase(); // TODO
		//console.log(`removeWeapon("${attackName}")`);

		delete this.equipment.attacks[attackName];
	}

	// Spellcasting
	getSpellcastingModifier(): number {
		//console.log(`getSpellcastingModifier("${this.magic.spellcastingAbility}")`);
		return (
			this.getAbilityModifier(this.magic.spellcastingAbility) +
			this.getProficiencyBonus() +
			this.magic.bonusTpC
		);
	}
	getSpellcastingDC(): number {
		//console.log(`getAbilityProficiency("${this.magic.spellcastingAbility}")`);

		return (
			8 +
			this.getAbilityModifier(this.magic.spellcastingAbility) +
			this.getProficiencyBonus() +
			this.magic.bonusDC
		);
	}
	getSpellList(): Spell[] {
		//console.log(`getSpellList()`);

		let spellNullList = Object.values(this.magic.spells);
		let spellList = spellNullList.filter((s) => s) as Spell[];

		spellList.sort((a, b) => a.level - b.level);
		return spellList;
	}
	addSpell(spellName: string): boolean {
		spellName = spellName.toUpperCase(); // TODO
		//console.log(`addSpell("${spellName}")`);

		let spell: Spell | null = getSpell(spellName);
		if (!spell || this.magic.spells[spellName]) {
			return false;
		}

		this.magic.spells[spellName] = spell;

		return true;
	}
	removeSpell(spellName: string): void {
		spellName = spellName.toUpperCase(); // TODO
		//console.log(`removeSpell("${spellName}")`);

		let spell: Spell | null = getSpell(spellName);
		if (!spell || !this.magic.spells[spellName]) {
			return;
		}

		delete this.magic.spells[spellName];
	}
}
