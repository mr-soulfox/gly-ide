import type { ZStore } from '@/types/store';
import { randomString } from '@/utils/randomstring';
import LZString from 'lz-string';
import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const projectStore = createStore(
	persist<ZStore.Project>(
		(set) => ({
			id: null,
			name: null,
			data: null,

			newProject: () => {
				const id = `${randomString()}-${Date.now()}`;
				const name = 'Sample_Project';

				set((state) => ({ ...state, id: id, name: name, data: null }));
				return;
			},
			setName: (name: string) => set((state) => ({ ...state, name })),
			save: (current) => {
				const data = LZString.compress(JSON.stringify(current));

				set((state) => ({ ...state, data: data }));
				return;
			},
		}),
		{
			name: 'project-info',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
