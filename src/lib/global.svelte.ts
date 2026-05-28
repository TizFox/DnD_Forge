export const NAME = "D&D Forge";
const PATH = "/DnD_Forge";
export const getPath = (user?: string, id?: string): string => {
	if (user && id) {
		return PATH + "/" + user + "_" + id;
	}
	return PATH;
};

export const STORAGE_CHARACTER = "currentCharacter";
export const BASE_COLOR = "#f0abfc";
let keyboard = $state<boolean>(true);
export const toggleKeyboard = () => {
	keyboard = !keyboard;
};
export const showKeyboard = () => {
	return keyboard;
};
