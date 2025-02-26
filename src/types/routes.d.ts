import { RouteObject } from 'react-router-dom';

export declare namespace ReactRouter {
	type RouteObjectDetails = RouteObject & RoutesMetadata;

	type RoutesMetadata = {
		title: string;
		description: string;
		path: string;
		favicon?: string;
	};

	type Routes = Record<string, RouteObjectDetails>;
}
