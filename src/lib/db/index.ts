import { configureSingle } from '@zenfs/core';
import { exists, writeFile } from '@zenfs/core/promises';
import { IndexedDB } from '@zenfs/dom';

// TODO: Implements new methods to handler and construct files
export class StorageDB {
	public static async setup(): Promise<void> {
		await configureSingle<IndexedDB>({ backend: IndexedDB, storeName: 'editor' });

		const res = await fetch(`/engine/cli-${import.meta.env.VITE_ENGINE_VERSION.split('.').join('_')}.lua`);
		const hasCli = await exists('/cli.lua');

		if (!hasCli) {
			await writeFile('/cli.lua', await res.text());
			console.log('Gamely CLI installed');
		}
	}
}
