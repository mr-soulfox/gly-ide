import { Box } from '@mui/material';
import { Logo } from '@/components/header/logo';
import { ProjectName } from '@/components/header/projectName';
import { Users } from '@/components/header/users';
import { theme } from '@/styles/theme';

export function Header() {
	return (
		<header>
			<Box
				className='font-display w-full flex justify-between items-center px-8 py-2 border-solid border-b-2'
				style={{
					backgroundColor: theme.palette.background.default,
					borderColor: theme.palette.divider,
				}}>
				<Logo />
				<ProjectName />
				<Users />
			</Box>
		</header>
	);
}
