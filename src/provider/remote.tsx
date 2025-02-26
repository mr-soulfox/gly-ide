import type { Providers } from '@/types/provider';
import type { ZStore } from '@/types/store';
import { RemoteContext } from '@/context/remote';
import { useEffect } from 'react';
import { useStore } from 'zustand';

export function RemoteProvider({ value, children }: Providers.StoreProps<ZStore.Remote>) {
	const remoteStore = useStore(value);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);

		if (searchParams.has('remoteOffer') && remoteStore.remoteInstance === null) {
			remoteStore.init();
		}

		if (searchParams.has('remoteOffer') && remoteStore.remoteInstance != null) {
			const offer = String(searchParams.get('remoteOffer'));
			remoteStore.remoteInstance.acceptOffer(offer);

			console.log('received offer: ', offer);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [remoteStore.remoteInstance]);

	return <RemoteContext.Provider value={value}>{children}</RemoteContext.Provider>;
}
