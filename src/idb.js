import { openDB } from 'idb';

const DB_NAME = 'diary-db';
const STORE_NAME = 'diaries';

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function addDiary(entry) {
  const db = await initDB();
  const { id, ...data } = entry; // id 제거하고 저장
  await db.add(STORE_NAME, data);
}

export async function getDiaries() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteDiary(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

export async function updateDiary(entry) {
  const db = await initDB();
  await db.put(STORE_NAME, entry);
}