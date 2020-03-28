/*
 * determine if this app run in development mode
 */
export const isDev = process.env.NODE_ENV === 'development';

/*
 * well, there's a time in development where we don't want to log any
 * message intended for debugging purpose, so you could "mute" all
 * printDevLog invocation using this toggleLog switch, it's better
 * instead of deleting or commenting out every printDevLog occurrences
 * in our code, which is probably A LOT !.
 */
const turnOnDevLog = true;

/*
 * for logging some information in development mode
 */
export function printDevLog(msg: string) {
	if (isDev && turnOnDevLog) {
		console.log(msg);
	}
}
