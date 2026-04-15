import { Character } from "$lib/character.svelte";
import type { CharacterType } from "$lib/character.svelte";

export const FILE_EXTENTION = ".dndchar";

export function load(file: File, onLoad: (data: CharacterType) => void): void {
	const reader = new FileReader();

	reader.onload = () => {
		onLoad(JSON.parse(reader.result as string) as CharacterType);
	};
	reader.readAsText(file);
}

export function save(char: Character): void {
	char.info.name = char.info.name.trim();
	const name =
		char.info.name != "" ? char.info.name.split(" ").join("_") : "unknown";

	const json = JSON.stringify(char);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name + FILE_EXTENTION;
	a.click();
	URL.revokeObjectURL(url);
}
