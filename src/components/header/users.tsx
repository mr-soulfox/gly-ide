import { RemoteContext } from '@/context/remote';
import { useUser } from '@/hooks/useUser';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useStore } from 'zustand';

export function Users() {
	const { id, name } = useUser();
	const remoteContext = useContext(RemoteContext);
	const remoteStore = useStore(remoteContext);
	const [isOver, setIsOver] = useState<Map<string, boolean>>(new Map<string, boolean>());

	useEffect(() => {
		setIsOver((state) => {
			const newState = new Map<string, boolean>(state);
			newState.set(String(id), false);
			remoteStore.users.forEach((user) => {
				if (user.id !== id) {
					newState.set(String(user.id), false);
				}
			});

			return newState;
		});
	}, [id, remoteStore.users]);

	const handleMouseOver = useCallback((userID: string, type: 'entry' | 'exit') => {
		setIsOver((state) => {
			state.delete(String(userID));

			const newState = new Map<string, boolean>(state);
			newState.set(String(userID), type === 'entry' ? true : false);

			return newState;
		});
	}, []);

	const usersRendered = useMemo(() => {
		return remoteStore.users.map((user) => (
			<Tooltip
				key={user.id}
				title={user.name}
				open={isOver.get(String(user.id)) ?? false}>
				<Avatar
					variant='circular'
					onMouseOver={() => handleMouseOver(String(user.id), 'entry')}
					onMouseLeave={() => handleMouseOver(String(user.id), 'exit')}
					src={user.name ?? ''}
					alt={user.name ?? ''}
				/>
			</Tooltip>
		));
	}, [handleMouseOver, isOver, remoteStore.users]);

	return (
		<AvatarGroup>
			<Tooltip
				title='You'
				open={isOver.get(String(id)) ?? false}>
				<Avatar
					variant='circular'
					onMouseOver={() => handleMouseOver(String(id), 'entry')}
					onMouseLeave={() => handleMouseOver(String(id), 'exit')}
					src={name?.slice(0, 1) ?? ''}
					alt={name?.slice(0, 1) ?? ''}
				/>
			</Tooltip>

			{usersRendered}
		</AvatarGroup>
	);
}
