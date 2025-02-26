import type React from 'react';
import type { ReactRouter } from '@/types/routes';

interface IMetadata extends Omit<ReactRouter.RoutesMetadata, 'path'> {
	children: React.ReactNode;
}

export function Metadata({ title, description, favicon, children }: IMetadata) {
	document.title = title;
	(document.querySelector('meta[name="description"]') as HTMLMetaElement).content = description;
	(document.querySelector('link[rel="icon"]') as HTMLLinkElement).href = favicon ?? '/favicon.ico';

	return children;
}
