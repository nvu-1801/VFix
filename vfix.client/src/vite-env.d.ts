interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // add more env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
