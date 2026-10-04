import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Persistent key/value storage for the Supabase auth session.
 *
 * MMKV is the intended driver but it is a Nitro native module, so it cannot
 * load inside Expo Go. Until a development build exists we fall back to
 * AsyncStorage. Both satisfy Supabase's `SupportedStorage`, which accepts
 * sync or async reads.
 *
 * `require` is deliberately wrapped in try/catch: importing MMKV throws when
 * the native module is absent, and Metro evaluates it at module scope.
 */

export type StorageDriver = 'mmkv' | 'asyncstorage';

export interface KeyValueStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

const MMKV_INSTANCE_ID = 'spendshield';

function createMmkvStorage(): KeyValueStorage | null {
  try {
    const mmkvModule = require('react-native-mmkv') as typeof import('react-native-mmkv');
    const mmkv = mmkvModule.createMMKV({ id: MMKV_INSTANCE_ID });

    return {
      getItem: (key) => mmkv.getString(key) ?? null,
      setItem: (key, value) => {
        mmkv.set(key, value);
      },
      removeItem: (key) => {
        mmkv.remove(key);
      },
    };
  } catch {
    return null;
  }
}

const mmkvStorage = createMmkvStorage();

export const storageDriver: StorageDriver = mmkvStorage ? 'mmkv' : 'asyncstorage';

export const storage: KeyValueStorage = mmkvStorage ?? {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => {
    void AsyncStorage.setItem(key, value);
  },
  removeItem: (key) => {
    void AsyncStorage.removeItem(key);
  },
};