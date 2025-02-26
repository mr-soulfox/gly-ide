import { RemoteConnection } from '@/lib/remote';

export declare namespace ZStore {
	type UserType = 'owner' | 'member';

	interface User {
		id: null | string;
		name: null | string;
		type: UserType;

		newUser: () => void;
		setName: (name: string) => void;
		setType: (type: UserType) => void;
	}

	interface Project {
		id: null | string;
		name: null | string;
		data: null | string;

		newProject: () => void;
		setName: (name: string) => void;
		save: (current: Record<string, string>) => void;
	}

	interface Remote {
		remoteInstance: null | RemoteConnection;
		users: Array<Pick<User, 'name'> & Pick<User, 'id'>>;

		setUsers: (user: Pick<User, 'name'> & Pick<User, 'id'>) => void;
		init: () => void;
	}
}
