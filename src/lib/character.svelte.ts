import {
	type Alignments,
	type DeathTS,
	type AbilitiesType,
	type SkillsType,
	type Ability,
	type CoinsEnum,
	type Attack,
	type Spell,
	type SpellSlot,
	Morality,
	Order,
	Sizes,
	SIZES_ELUSION,
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
		size: Sizes;
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
		deathTS: Record<DeathTS, [boolean, boolean, boolean]>;
	};

	stats: { [Ab in AbilitiesType]: Ability<Ab> };

	features: {
		class_traits: string;
		subclass_traits: string;
		race_and_background_traits: string;
	};

	equipment: {
		coins: { [key in CoinsEnum]: number };
		inventory: string;
		proficiencies: string;
		actions: string;
		attacks: Record<string, Attack>;
	};

	magic: {
		spellcastingAbility: AbilitiesType;
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
			alignment: { morality: Morality.Neutral, order: Order.Neutral },

			class: "",
			race: "",
			size: Sizes.Medium,
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
		});
		this.features = $state({
			class_traits: "",
			subclass_traits: "",
			race_and_background_traits: "",
		});
		this.equipment = $state({
			coins: {
				cp: 0,
				sp: 0,
				ep: 0,
				gp: 0,
				pp: 0,
			},
			inventory: "",
			proficiencies: "",
			actions: "",
			attacks: {},
		});
		this.magic = $state({
			spellcastingAbility: "strength",
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
	getAbilityProficiency(ab: AbilitiesType): boolean {
		//console.log(`getAbilityProficiency("${ab}")`);
		return this.stats[ab].proficiency;
	}
	getAbilityValue(ab: AbilitiesType): number {
		//console.log(`getAbilityValue("${ab}")`);
		return this.stats[ab].value;
	}
	getAbilityModifier(ab: AbilitiesType): number {
		//console.log(`getAbilityModifier("${ab}")`);
		return Math.floor((this.getAbilityValue(ab) - 10) / 2);
	}
	getAbilitySaveThrow(ab: AbilitiesType): number {
		//console.log(`getAbilitySaveThrow("${ab}")`);
		return (
			this.getAbilityModifier(ab) +
			(this.getAbilityProficiency(ab) ? this.getProficiencyBonus() : 0)
		);
	}

	// Skills
	getSkillProficiency<Ab extends AbilitiesType>(
		ab: Ab,
		sk: SkillsType[Ab],
	): boolean {
		//console.log(`getSkillProficiency("${ab}", "${sk}")`);
		return this.stats[ab].skills[sk].proficiency ?? false;
	}
	getSkillExpertise<Ab extends AbilitiesType>(
		ab: Ab,
		sk: SkillsType[Ab],
	): boolean {
		//console.log(`getSkillExpertise("${ab}", "${sk}")`);
		return this.stats[ab].skills[sk]?.expertise ?? false;
	}
	getSkillValue<Ab extends AbilitiesType>(
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
	getPassiveSkillValue<Ab extends AbilitiesType>(
		ability: Ab,
		skill: SkillsType[Ab],
	): number {
		//console.log(`getPassivePerception()`);
		return 10 + this.getSkillValue(ability, skill);
	}

	// Attacks
	getAttackModifier(attackName: string): number {
		attackName = attackName.toUpperCase();
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
		attackName = attackName.toUpperCase();
		//console.log(`addAttack("${attackName}")`);

		this.equipment.attacks[attackName] = getEmptyAttack(attackName);
	}
	removeAttack(attackName: string): void {
		attackName = attackName.toUpperCase();
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
		spellName = spellName.toUpperCase();
		//console.log(`addSpell("${spellName}")`);

		let spell: Spell | null = getSpell(spellName);
		if (!spell || this.magic.spells[spellName]) {
			return false;
		}

		this.magic.spells[spellName] = spell;

		return true;
	}
	removeSpell(spellName: string): void {
		spellName = spellName.toUpperCase();
		//console.log(`removeSpell("${spellName}")`);

		let spell: Spell | null = getSpell(spellName);
		if (!spell || !this.magic.spells[spellName]) {
			return;
		}

		delete this.magic.spells[spellName];
	}
}
