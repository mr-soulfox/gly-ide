import '@/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { reactRouter } from '@/routes';
import { UserProvider } from '@/provider/user';
import { userStore } from '@/store/user';
import { ProjectProvider } from '@/provider/project';
import { projectStore } from '@/store/project';
import { RemoteProvider } from '@/provider/remote';
import { remoteStore } from '@/store/remote';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<UserProvider value={userStore}>
				<RemoteProvider value={remoteStore}>
					<ProjectProvider value={projectStore}>
						<RouterProvider router={reactRouter} />
					</ProjectProvider>
				</RemoteProvider>
			</UserProvider>
		</ThemeProvider>
	</StrictMode>,
);
