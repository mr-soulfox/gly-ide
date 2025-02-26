import type { Providers } from '@/types/provider';
import type { ZStore } from '@/types/store';
import { UserContext } from '@/context/user';
import { useEffect } from 'react';
import { useStore } from 'zustand';

export function UserProvider({ value, children }: Providers.StoreProps<ZStore.User>) {
	const userStore = useStore(value);

	useEffect(() => {
		if (userStore.id === null) {
			userStore.newUser();
		}
	}, [userStore]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
