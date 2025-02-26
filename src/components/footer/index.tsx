import { theme } from '@/styles/theme';
import { Box, Typography } from '@mui/material';

export function Footer() {
	return (
		<footer>
			<Box
				className='flex row w-full fixed bottom-0 font-display justify-between items-center border-solid border-t-2 py-1 px-2'
				style={{
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.primary,
				}}>
				<Typography variant='overline'>Engine v{import.meta.env.VITE_ENGINE_VERSION}</Typography>
			</Box>
		</footer>
	);
}
