import { Avatar, Link } from '@mui/material';
import logo from '/img/logo/80x80.png?url';

export function Logo() {
	return (
		<Link
			href='https://github.com/gamelly/'
			target='_blank'>
			<Avatar src={logo} />
		</Link>
	);
}
