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
