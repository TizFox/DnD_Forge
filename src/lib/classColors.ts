const colorMap: Record<string, string> = {
	artificer: "var(--color-orange-400)",
	barbarian: "var(--color-red-400)",
	bard: "var(--color-pink-500)",
	cleric: "var(--color-yellow-200)",
	druid: "var(--color-green-400)",
	fighter: "var(--color-blue-400)",
	monk: "var(--color-sky-300)",
	paladin: "var(--color-amber-400)",
	ranger: "var(--color-teal-500)",
	rogue: "var(--color-lime-200)",
	sorcerer: "var(--color-purple-400)",
	warlock: "var(--color-violet-400)",
	wizard: "var(--color-indigo-400)",
	default: "var(--color-slate-400)",
	multiclass: "#DAA520",
};

const synonyms: Record<string, string> = {
	artefice: "artificer",
	barbaro: "barbarian",
	bardo: "bard",
	chierico: "cleric",
	druido: "druid",
	guerriero: "fighter",
	monaco: "monk",
	paladino: "paladin",
	ladro: "rogue",
	stregone: "sorcerer",
	mago: "wizard",
	multiclasse: "multiclass",
};

export function getColor(charClass: string): string {
	charClass = charClass.split(" ")[0];
	if (colorMap[charClass]) {
		return colorMap[charClass];
	}

	if (synonyms[charClass]) {
		return colorMap[synonyms[charClass]];
	}

	return colorMap.default;
}
