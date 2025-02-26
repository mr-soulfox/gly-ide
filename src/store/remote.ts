import { RemoteConnection } from '@/lib/remote';
import type { ZStore } from '@/types/store';
import { createStore } from 'zustand';
import LZString from 'lz-string';

export const remoteStore = createStore<ZStore.Remote>((set) => ({
	remoteInstance: null,
	offer: null,
	answer: null,
	users: [],

	setUsers: (user) => {
		set((state) => ({ ...state, users: [...state.users, user] }));
		return;
	},
	init: () => {
		set((state) => {
			const instance = new RemoteConnection();

			instance.setOnMessage((event: MessageEvent<{ message: string }>) => {
				const msg = JSON.parse(LZString.decompress(event.data.message));
				if (msg.type === 'handshake') {
					state.setUsers(msg.data);
				}

				console.debug('Received message:', msg);
			});

			return {
				...state,
				remoteInstance: instance,
			};
		});
		return;
	},
}));
