import type { ZStore } from '@/types/store';
import { RemoteContext } from '@/context/remote';
import { useContext } from 'react';
import { useStore } from 'zustand';

export function useRemote(): Omit<ZStore.Remote, 'setUsers'> {
	const remoteContext = useContext(RemoteContext);
	const remoteStore = useStore(remoteContext);

	return remoteStore;
}
