/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEB_RTC_URL: string;
	readonly VITE_ENGINE_VERSION: `${number}.${number}.${number}` | `${number}.${number}` | `${number}`;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
