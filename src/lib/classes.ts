enum Classes {
	Artificer = "artificer",
	Barbarian = "barbarian",
	Bard = "bard",
	Cleric = "cleric",
	Druid = "druid",
	Fighter = "fighter",
	Monk = "monk",
	Paladin = "paladin",
	Ranger = "ranger",
	Rogue = "rogue",
	Sorcerer = "sorcerer",
	Warlock = "warlock",
	Wizard = "wizard",
	Multiclass = "multiclass",
	// Lingue
	Artefice = Artificer,
	Barbaro = Barbarian,
	Bardo = Bard,
	Chierico = Cleric,
	Druido = Druid,
	Guerriero = Fighter,
	Monaco = Monk,
	Paladino = Paladin,
	Ladro = Rogue,
	Stregone = Sorcerer,
	Mago = Wizard,
	Multiclasse = Multiclass,
}

const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const getTrueClass = (rawClass: string): Classes | undefined => {
	return Object.values(Classes)[
		Object.keys(Classes).indexOf(capitalize(rawClass))
	];
};

const BASE_COLOR = "var(--color-slate-400)";
const colorMap: Record<Classes, string> = {
	[Classes.Artificer]: "var(--color-orange-400)",
	[Classes.Barbarian]: "var(--color-red-400)",
	[Classes.Bard]: "var(--color-pink-500)",
	[Classes.Cleric]: "var(--color-yellow-200)",
	[Classes.Druid]: "var(--color-green-400)",
	[Classes.Fighter]: "var(--color-blue-400)",
	[Classes.Monk]: "var(--color-sky-300)",
	[Classes.Paladin]: "var(--color-amber-400)",
	[Classes.Ranger]: "var(--color-teal-500)",
	[Classes.Rogue]: "var(--color-lime-200)",
	[Classes.Sorcerer]: "var(--color-purple-400)",
	[Classes.Warlock]: "var(--color-violet-400)",
	[Classes.Wizard]: "var(--color-indigo-400)",
	[Classes.Multiclass]: "#DAA520",
};

export const getColor = (charClass: string): string => {
	let trueClass = getTrueClass(charClass);
	if (trueClass) {
		return colorMap[trueClass];
	}

	return BASE_COLOR;
};

export const getClassNames = (): string[] => {
	return Object.keys(Classes).sort();
};
