import type { ZStore } from '@/types/store';
import { projectStore } from '@/store/project';
import { createContext } from 'react';
import { StoreApi } from 'zustand';

export const ProjectContext = createContext<StoreApi<ZStore.Project>>(projectStore);
