export function randomString() {
	return Math.random().toString(36).split('').slice(-8).join('');
}
