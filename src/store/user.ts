import type { ZStore } from '@/types/store';
import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { randomString } from '@/utils/randomstring';

export const userStore = createStore(
	persist<ZStore.User>(
		(set) => ({
			id: null,
			name: null,
			type: 'owner',

			newUser: () => {
				const id = `${randomString()}-${Date.now()}`;
				const name = randomString();

				set((state) => ({ ...state, id: id, name: name }));
				return;
			},
			setName: (name: string) => set((state) => ({ ...state, name })),
			setType: (type: ZStore.UserType) => set((state) => ({ ...state, type })),
		}),
		{
			name: 'user-info',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
