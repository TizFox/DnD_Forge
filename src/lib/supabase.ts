import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { logger } from "./logs";

import { Character } from "./character.svelte";

const supabase: SupabaseClient = createClient(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_KEY,
);

export const getCharacters = async (
	user: string,
): Promise<Array<{ id: string; character: string }>> => {
	user = user.toLowerCase();

	let { data, error } = await supabase
		.from("characters")
		.select("id, character")
		.eq("user", user);

	if (error) {
		logger.error(user, "SUPABASE ", error.message);
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
		logger.error(
			user,
			"SUPABASE ",
			error ? error.message : "Character not found",
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
		logger.error(
			user,
			"SUPABASE ",
			error ? error.message : "Can't create new Character",
		);
	}
	return data?.id;
};

export const saveCharacter = async (
	user: string,
	characterId: string,
	newCharacter?: Character,
): Promise<boolean> => {
	if (!newCharacter) {
		return true;
	}

	user = user.toLowerCase();

	let { data, error: selectError } = await supabase
		.from("characters")
		.select("*")
		.eq("user", user)
		.eq("id", characterId)
		.single();
	if (selectError || !data) {
		logger.error(
			user,
			"SUPABASE ",
			selectError ? selectError.message : "Character not found",
		);
		return false;
	}

	let { error: updateError } = await supabase
		.from("characters")
		.update([{ character: JSON.stringify(newCharacter) }])
		.eq("user", user)
		.eq("id", characterId);
	if (updateError) {
		logger.error(user, "SUPABASE ", updateError.message);
		return false;
	}
	return true;
};

export const deleteCharacter = async (
	user: string,
	characterId: string,
): Promise<boolean> => {
	user = user.toLowerCase();

	let { error } = await supabase
		.from("characters")
		.delete()
		.eq("user", user)
		.eq("id", characterId);
	if (error) {
		logger.error(user, "SUPABASE ", error.message);
		return false;
	}
	return true;
};
