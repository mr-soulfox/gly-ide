import type { ZStore } from '@/types/store';
import { userStore } from '@/store/user';
import { createContext } from 'react';
import { StoreApi } from 'zustand';

export const UserContext = createContext<StoreApi<ZStore.User>>(userStore);
