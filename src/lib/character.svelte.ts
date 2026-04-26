import {
	type Alignments,
	type CoinsEnum,
	type AbilitiesEnum,
	type Ability,
	type SkillsEnum,
	type Weapon,
	type Spell,
	Morality,
	Order,
} from "./types";

export type CharacterType = InstanceType<typeof Character>;

export class Character {
	info: {
		player: string;
		name: string;
		background: string;
		alignment: Alignments;

		class: string;
		race: string;
		speed: number;
		initiative: number;
		level: number;
		ca: number;

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
			personality_traits: string;
			ideals: string;
			bonds: string;
			flaws: string;
			backstory: string;
		};

		actions: string;
	};

	hp: {
		current: number;
		max: number;
		temp: number;
		hitDice: {
			max: number;
			type: number;
			spent: number;
		};
		deathTS: {
			success: number;
			failure: number;
		};
	};

	stats: { [Ab in AbilitiesEnum]: Ability<SkillsEnum[Ab]> };

	features: {
		class_traits: string;
		subclass_traits: string;
		race_and_background_traits: string;
		proficiencies: string;
		languages: string;
	};

	equipment: {
		coins: { [key in CoinsEnum]: number };
		inventory: string;
		weapons: Weapon[];
	};

	magic: {
		spells: Spell[];
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
			name: "",
			background: "",
			alignment: { morality: Morality.Neutral, order: Order.Neutral },

			class: "",
			race: "",
			speed: 0,
			initiative: 0,
			level: 1,
			ca: 0,

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
				personality_traits: "",
				ideals: "",
				bonds: "",
				flaws: "",
				backstory: "",
			},

			actions: "",
		});
		this.hp = $state({
			current: 0,
			max: 1,
			temp: 0,
			hitDice: {
				max: 1,
				type: 0,
				spent: 0,
			},
			deathTS: {
				success: 0,
				failure: 0,
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
			proficiencies: "",
			languages: "",
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
			weapons: [],
		});
		this.magic = $state({
			spells: [],
		});
	}

	getProficiencyBonus(): number {
		console.log(`getProficiencyBonus()`);
		return Math.floor((this.info.level - 1) / 4) + 2;
	}

	// Abilities
	getAbilityProficiency(ab: AbilitiesEnum): boolean {
		console.log(`getAbilityProficiency(${ab})`);
		return this.stats[ab].proficiency;
	}
	setAbilityProficiency(ab: AbilitiesEnum, val: boolean): void {
		console.log(`setAbilityProficiency(${ab}, ${val})`);
		this.stats[ab].proficiency = val;
	}
	getAbilityValue(ab: AbilitiesEnum): number {
		console.log(`getAbilityValue(${ab})`);
		return this.stats[ab].value;
	}
	getAbilityModifier(ab: AbilitiesEnum): number {
		console.log(`getAbilityModifier(${ab})`);
		return Math.floor((this.getAbilityValue(ab) - 10) / 2);
	}
	getAbilitySaveThrow(ab: AbilitiesEnum): number {
		console.log(`getAbilitySaveThrow(${ab})`);
		return (
			this.getAbilityModifier(ab) +
			(this.getAbilityProficiency(ab) ? this.getProficiencyBonus() : 0)
		);
	}

	// Skills
	getSkillProficiency<Ab extends AbilitiesEnum>(
		ab: Ab,
		sk: SkillsEnum[Ab],
	): boolean {
		console.log(`getSkillProficiency(${ab}, ${sk})`);
		return this.stats[ab].skills[sk].proficiency ?? false;
	}
	setSkillProficiency<Ab extends AbilitiesEnum>(
		ab: Ab,
		sk: SkillsEnum[Ab],
		val: boolean,
	): void {
		console.log(`setSkillProficiency(${ab}, ${sk}, ${val})`);
		this.stats[ab].skills[sk].proficiency = val;

		if (!val) {
			this.setSkillExpertise(ab, sk, false);
		}
	}

	getSkillExpertise<Ab extends AbilitiesEnum>(
		ab: Ab,
		sk: SkillsEnum[Ab],
	): boolean {
		console.log(`getSkillExpertise(${ab}, ${sk})`);
		return this.stats[ab].skills[sk]?.expertise ?? false;
	}
	setSkillExpertise<Ab extends AbilitiesEnum>(
		ab: Ab,
		sk: SkillsEnum[Ab],
		val: boolean,
	): void {
		console.log(`setSkillExpertise(${ab}, ${sk}, ${val})`);
		this.stats[ab].skills[sk].expertise = val;

		if (val) {
			this.setSkillProficiency(ab, sk, true);
		}
	}
	getSkillValue<Ab extends AbilitiesEnum>(
		ab: Ab,
		sk: SkillsEnum[Ab],
	): number {
		console.log(`getSkillValue(${ab}, ${sk})`);
		return (
			this.getAbilityModifier(ab) +
			(this.getSkillProficiency(ab, sk)
				? this.getProficiencyBonus()
				: 0) +
			(this.getSkillExpertise(ab, sk) ? this.getProficiencyBonus() : 0)
		);
	}
	getPassiveSkillValue<Ab extends AbilitiesEnum>(
		ability: Ab,
		skill: SkillsEnum[Ab],
	): number {
		console.log(`getPassivePerception()`);
		return 10 + this.getSkillValue(ability, skill);
	}
}
