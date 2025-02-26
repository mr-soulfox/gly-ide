import { PlaygroundPage } from '@/pages/playground';
import type { ReactRouter } from '@/types/routes';
import { playgroundMetadata } from '@/pages/playground/metadata';
import { notFoundError } from '@/pages/errors/404/metadata';
import { NotFoundPage } from '@/pages/errors/404';

export const ROUTES: ReactRouter.Routes = {
	root: {
		...playgroundMetadata,
		element: <PlaygroundPage />,
	},
	notFound: {
		...notFoundError,
		element: <NotFoundPage />,
	},
} as const;
