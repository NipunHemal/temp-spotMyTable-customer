// memoryStore.ts

interface MemoryStore {
    reference?: string;
  }
  
  let memoryStore: MemoryStore = {};
  
  export const setReference = (reference: string): void => {
    memoryStore.reference = reference;
  };
  
  export const getReference = (): string | undefined => {
    return memoryStore.reference;
  };
  
  export const clearReference = (): void => {
    memoryStore.reference = undefined;
  };
  