import { Metadata } from '@/components/global/metadata';
import { ROUTES } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const reactRouter = createBrowserRouter(
	Object.keys(ROUTES).map((routeName: string) => {
		return {
			...ROUTES[routeName as keyof typeof ROUTES],
			element: (
				<Metadata
					description={ROUTES[routeName as keyof typeof ROUTES].description}
					title={ROUTES[routeName as keyof typeof ROUTES].title}
					favicon={ROUTES[routeName as keyof typeof ROUTES].favicon ?? '/favicon.ico'}>
					{ROUTES[routeName as keyof typeof ROUTES].element}
				</Metadata>
			),
		};
	}),
);
