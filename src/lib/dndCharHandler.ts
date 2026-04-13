import type { Character } from "$lib/types";

export const FILE_EXTENTION = ".dndchar";

function checkCharacter(jsonString: string): Character {
	return JSON.parse(jsonString) as Character;
}

export function load(file: File, onLoad: (c: Character) => void): void {
	const reader = new FileReader();

	reader.onload = () => {
		onLoad(checkCharacter(reader.result as string));
	};
	reader.readAsText(file);
}

export function save(data: Character): void {
	data.info.name = data.info.name.trim();
	const name =
		data.info.name != "" ? data.info.name.split(" ").join("_") : "unknown";

	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name + FILE_EXTENTION;
	a.click();
	URL.revokeObjectURL(url);
}
