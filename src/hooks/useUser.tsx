import type { ZStore } from '@/types/store';
import { UserContext } from '@/context/user';
import { useContext } from 'react';
import { useStore } from 'zustand';

export function useUser(): Omit<ZStore.User, 'newUser'> {
	const userContext = useContext(UserContext);
	const userStore = useStore(userContext);

	return {
		id: userStore.id,
		name: userStore.name,
		type: userStore.type,

		setName: userStore.setName,
		setType: userStore.setType,
	};
}
