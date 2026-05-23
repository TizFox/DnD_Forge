export const NAME = "D&D Forge";
export const PATH = "/DnD_Forge";

let keyboard = $state<boolean>(true);
export const showKeyboard = () => {
	return keyboard;
};
export const toggleKeyboard = () => {
	keyboard = !keyboard;
};
