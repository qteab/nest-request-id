import { AsyncLocalStorage } from "async_hooks";

export const CorrelationIdStore = new AsyncLocalStorage<string>();

export const getCorrelationId = () => CorrelationIdStore.getStore();
