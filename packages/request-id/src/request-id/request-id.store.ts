import { AsyncLocalStorage } from 'async_hooks';

export const RequestIdStore = new AsyncLocalStorage<string>();

export const getRequestId = () => RequestIdStore.getStore();
