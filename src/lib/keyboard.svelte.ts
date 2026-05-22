let keyboard = $state<boolean>(true);

export const showKeyboard = () => {
	return keyboard;
};

export const toggleKeyboard = () => {
	keyboard = !keyboard;
	console.log(keyboard);
};
