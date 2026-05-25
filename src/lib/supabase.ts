import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

import { Character } from "./character.svelte";

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export const getCharacters = async (
	user: string,
): Promise<Array<{ id: string; character: string }>> => {
	user = user.toLowerCase();

	let { data, error } = await supabase
		.from("characters")
		.select("id, character")
		.eq("user", user);

	if (error) {
		console.log("ERROR: " + error.message);
		return [];
	}

	return data ?? [];
};

export const getCharacter = async (
	user: string,
	characterId: string,
): Promise<{ id: string; character: string } | null> => {
	user = user.toLowerCase();

	let { data, error } = await supabase
		.from("characters")
		.select("id, character")
		.eq("user", user)
		.eq("id", characterId)
		.single();

	if (error || !data) {
		console.log(
			"ERROR: " + (error ? error.message : "Character Not Found"),
		);
		return null;
	}

	return data; // {id: "", character: ""}
};

export const createCharacter = async (
	user: string,
	newCharacter: Character,
): Promise<string | null> => {
	user = user.toLowerCase();

	let { data, error } = await supabase
		.from("characters")
		.insert({ user: user, character: JSON.stringify(newCharacter) })
		.select("id")
		.single();
	if (error || !data) {
		console.log("ERROR: " + (error ? error.message : "Can't Insert"));
	}
	return data?.id;
};

export const saveCharacter = async (
	user: string,
	characterId: string,
	newCharacter: Character,
): Promise<void> => {
	user = user.toLowerCase();

	let { data, error: selectError } = await supabase
		.from("characters")
		.select("*")
		.eq("user", user)
		.eq("id", characterId)
		.single();
	if (selectError || !data) {
		console.log(
			"ERROR: " +
				(selectError ? selectError.message : "Character Not Found"),
		);
		return;
	}

	let { error: updateError } = await supabase
		.from("characters")
		.update([{ character: JSON.stringify(newCharacter) }])
		.eq("user", user)
		.eq("id", characterId);
	if (updateError) {
		console.log("ERROR: " + updateError.message);
	}
};

export const deleteCharacter = async (
	user: string,
	characterId: string,
): Promise<void> => {
	user = user.toLowerCase();

	let { error } = await supabase
		.from("characters")
		.delete()
		.eq("user", user)
		.eq("id", characterId);
	if (error) {
		console.log("ERROR: " + error.message);
	}
};
