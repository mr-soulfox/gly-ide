import { Box, Divider } from '@mui/material';
import { PrimarySideBar } from './primary';
import { SecondarySideBar } from './secondary';
import { theme } from '@/styles/theme';

export function Sidebar() {
	return (
		<Box
			className='flex max-w-64 h-[calc(100vh-5rem)] row font-display items-start overflow-scroll border-solid border-r-2'
			style={{
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
			}}>
			<PrimarySideBar />
			<Divider
				orientation='vertical'
				className='pl-4'
				sx={{
					opacity: 0,
				}}
				flexItem
			/>
			<SecondarySideBar />
		</Box>
	);
}
