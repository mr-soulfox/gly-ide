import { StoreApi } from 'zustand';

export declare namespace Providers {
	export interface StoreProps<T> {
		value: StoreApi<T>;
		children: React.ReactNode;
	}
}
