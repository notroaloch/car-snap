import { $fetch } from 'ofetch';
const { autoSyncStudioApiKey, autoSyncStudioApiSource } = useRuntimeConfig();

export const autoSyncStudioApi = $fetch.create({
  baseURL: 'https://api.autosyncstudio.com',
  query: {
    key: autoSyncStudioApiKey,
    source: autoSyncStudioApiSource,
  },
});
