export const NAME = "D&D Forge";
const PATH = "/DnD_Forge";
export const getPath = (user?: string, id?: string): string => {
	if (user && id) {
		return PATH + "/" + user + "_" + id;
	}
	return PATH;
};

export const STORAGE_USER = "lastUser";
export const STORAGE_CHARACTER = "currentCharacter";
export const BASE_COLOR = "#ef4444"; //"#f0abfc";

export const toCapitalizeCase = (s: string): string => {
	return s[0].toUpperCase() + s.slice(1);
};

let keyboard = $state<boolean>(true);
export const toggleKeyboard = () => {
	keyboard = !keyboard;
};
export const showKeyboard = () => {
	return keyboard;
};

let lock = $state<boolean>(false);
export const toggleLock = () => {
	lock = !lock;
};
export const lockInput = () => {
	return lock;
};
