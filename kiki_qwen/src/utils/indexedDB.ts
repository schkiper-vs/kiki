// src/utils/indexedDB.ts
const DB_NAME = 'ProductivityAppDB';
const STORE_NAME = 'userSettings';

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
    request.onerror = (event) => reject(`Ошибка открытия IndexedDB: ${event}`);
  });
};

export const saveToDB = async (id: string, data: any): Promise<void> => {
  console.log('[IndexedDB] Saving:', { id, data }); // 👈 Логируем перед сохранением
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.put({ id, data });

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log('[IndexedDB] Успешно сохранено:', id); // ✅
      resolve();
    };
    request.onerror = (e) => {
      console.error('[IndexedDB] Ошибка сохранения:', e); // ❌
      reject(`Ошибка записи в IndexedDB: ${e}`);
    };
  });
};

export const loadFromDB = async <T = any>(id: string): Promise<T | null> => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result?.data || null;
      console.log('[IndexedDB] Загружено:', { id, result }); // 👈 Логируем загрузку
      resolve(result);
    };
    request.onerror = (e) => {
      console.error('[IndexedDB] Ошибка чтения:', e);
      reject('Ошибка чтения из IndexedDB');
    };
  });
};