import type { ZStore } from '@/types/store';
import { ProjectContext } from '@/context/project';
import { useContext } from 'react';
import { useStore } from 'zustand';

export function useProject(): Omit<ZStore.Project, 'newProject'> {
	const projectContext = useContext(ProjectContext);
	const projectStore = useStore(projectContext);

	return {
		id: projectStore.id,
		name: projectStore.name,
		data: projectStore.data,

		setName: projectStore.setName,
		save: projectStore.save,
	};
}
