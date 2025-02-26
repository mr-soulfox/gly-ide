import type { Providers } from '@/types/provider';
import type { ZStore } from '@/types/store';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { ProjectContext } from '@/context/project';

export function ProjectProvider({ value, children }: Providers.StoreProps<ZStore.Project>) {
	const projectStore = useStore(value);

	useEffect(() => {
		if (projectStore.name === null) {
			projectStore.newProject();
		}
	}, [projectStore]);

	return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
