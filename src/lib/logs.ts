const success = "#10b981";
const info = "#38bdf8";
const warn = "#fbbf24";
const error = "#ef4444";

const printLog = (
	user: string,
	where: string,
	msg: string,
	color: string,
): void => {
	console.info(
		`%c[${user.toUpperCase()}, ${where}] SUCCESS: ${msg}.`,
		"color:" + color,
	);
};

export const logger = {
	success: (user: string, where: string, msg: string) =>
		printLog(user, where, msg, success),
	info: (user: string, where: string, msg: string) =>
		printLog(user, where, msg, info),
	warn: (user: string, where: string, msg: string) =>
		printLog(user, where, msg, warn),
	error: (user: string, where: string, msg: string) =>
		printLog(user, where, msg, error),
};
