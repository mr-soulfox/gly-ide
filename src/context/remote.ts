import type { ZStore } from '@/types/store';
import { remoteStore } from '@/store/remote';
import { createContext } from 'react';
import { StoreApi } from 'zustand';

export const RemoteContext = createContext<StoreApi<ZStore.Remote>>(remoteStore);
