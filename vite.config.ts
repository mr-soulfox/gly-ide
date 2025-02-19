import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';
import tailwindcss from '@tailwindcss/vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react({
				babel: {
					plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
				},
			}),
			tailwindcss(),
			wasm(),
			topLevelAwait(),
		],
		base: '/',
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/'),
				'~': path.resolve(__dirname, './public/'),
			},
		},
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV),
			'process.env': process.env,
		},
		build: {
			outDir: './dist',
			emptyOutDir: true,
			rollupOptions: {
				plugins: [commonjs()],
			},
			commonjsOptions: {
				exclude: [/./],
			},
		},
		publicDir: './public',
	};
});
