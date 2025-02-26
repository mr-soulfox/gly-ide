import type React from 'react';

import { Box, Button, MenuItem, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useProject } from '@/hooks/useProject';
import { ChevronDown } from 'react-feather';
import { StyledMenu } from '@/styles/components/styledMenu';
import { useRemote } from '@/hooks/useRemote';
import { useUser } from '@/hooks/useUser';

const MIN_CHAR_NAME = 3;
const MAX_CHAR_NAME = 24;

export function ProjectName() {
	const { name, setName } = useProject();
	const user = useUser();
	const remote = useRemote();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [projectName, setProjectName] = useState<string>(name != null ? name.split('_').join(' ') : '');

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleTestRemote = async () => {
		remote.init();

		if (remote.remoteInstance != null) {
			await remote.remoteInstance.createOffer();
			window.open(`${document.URL}?remoteOffer=${remote.remoteInstance?.offer}`, '_blank', 'noopener,noreferrer');
			const answer = window.prompt('Cole o codigo gerado na tela do colaborador: ');
			await remote.remoteInstance.handshake(String(answer), {
				id: user.id,
				name: user.name,
			});
		}
	};

	useEffect(() => {
		if (projectName === '' || name === null) {
			setProjectName(name?.split('_').join(' ') ?? 'Sample Project');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

	return (
		<>
			<Box className='flex justify-center items-center'>
				<Tooltip
					title={`Must be more than ${MIN_CHAR_NAME} characters and less than ${MAX_CHAR_NAME}`}
					open={projectName.length < MIN_CHAR_NAME || projectName.length > MAX_CHAR_NAME}>
					<TextField
						variant='standard'
						className='cursor-text font-display hover:bg-gray-600/30 transition-all'
						style={{
							paddingLeft: 4,
							paddingRight: 4,
							paddingTop: 2,
							paddingBottom: 2,
							borderRadius: 4,
						}}
						value={projectName}
						onClick={() => setIsEditing(true)}
						onMouseLeave={() => {
							if (projectName.length >= MIN_CHAR_NAME && projectName.length <= MAX_CHAR_NAME) {
								setName(projectName.split(' ').join('_'));
								setIsEditing(false);
							}
						}}
						error={projectName.length < MIN_CHAR_NAME || projectName.length > MAX_CHAR_NAME}
						onChange={(e) => {
							if (isEditing) {
								setProjectName(e.target.value);
							}
						}}
						InputProps={{ disableUnderline: !isEditing }}
					/>
				</Tooltip>

				<Button
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					style={{
						borderRadius: 4,
					}}
					onClick={handleClick}>
					<ChevronDown />
				</Button>
			</Box>

			<StyledMenu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				<MenuItem onClick={handleTestRemote}>Share Remote</MenuItem>
				<MenuItem onClick={handleClose}>Copy link</MenuItem>
			</StyledMenu>
		</>
	);
}
