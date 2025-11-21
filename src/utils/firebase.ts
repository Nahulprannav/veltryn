// Lightweight Firebase/Realtime fallback helper
// Usage: provide Vite env vars VITE_FIREBASE_API_KEY etc to enable Firestore.
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs
} from 'firebase/firestore';

type Unsubscribe = () => void;

function getFirebaseConfig() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
  if (!apiKey) return null;
  return {
    apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  } as any;
}

let db: any = null;
function init() {
  if (db) return db;
  const cfg = getFirebaseConfig();
  if (!cfg) return null;
  if (!getApps().length) {
    initializeApp(cfg);
  }
  try {
    db = getFirestore();
    return db;
  } catch (e) {
    console.warn('Firestore init failed', e);
    return null;
  }
}

function localKey(coll: string) {
  return `realtime:${coll}`;
}

export async function addRealtimeDoc(collectionName: string, doc: any) {
  const fdb = init();
  if (fdb) {
    try {
      await addDoc(collection(fdb, collectionName), doc);
      return;
    } catch (e) {
      console.warn('Firestore addDoc failed, falling back to localStorage', e);
    }
  }

  // fallback: push to localStorage array and emit events
  try {
    const key = localKey(collectionName);
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(doc);
    localStorage.setItem(key, JSON.stringify(arr));
    // Also maintain legacy keys used elsewhere (messages, courseRegistrations)
    if (collectionName === 'messages') {
      const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
      msgs.push(doc);
      localStorage.setItem('messages', JSON.stringify(msgs));
    }
    if (collectionName === 'courseRegistrations') {
      const regs = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
      regs.push(doc);
      localStorage.setItem('courseRegistrations', JSON.stringify(regs));
    }

    // Notify same-window listeners
    window.dispatchEvent(new CustomEvent(`realtime:${collectionName}`, { detail: { type: 'added', doc } }));
    // A storage event for other tabs
    localStorage.setItem(`__lastRealtimeEvent__${collectionName}`, JSON.stringify({ type: 'added', doc, ts: Date.now() }));
  } catch (e) {
    console.error('Fallback realtime write failed', e);
  }
}

export function subscribeToCollection(collectionName: string, cb: (items: any[]) => void): Unsubscribe {
  const fdb = init();
  let unsubFs: Unsubscribe | null = null;

  if (fdb) {
    try {
      const collRef = collection(fdb, collectionName);
      // try ordering by createdAt if present
      const q = query(collRef);
      const snapUnsub = onSnapshot(q, (snap) => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        cb(docs);
      });
      unsubFs = () => snapUnsub();
    } catch (e) {
      console.warn('subscribeToCollection firestore failed', e);
    }
  }

  // Local fallback: immediately emit current items (legacy keys)
  const key = localKey(collectionName);
  try {
    const arr = JSON.parse(localStorage.getItem(key) || localStorage.getItem(collectionName) || '[]');
    cb(Array.isArray(arr) ? arr : []);
  } catch (e) {
    cb([]);
  }

  // listen for local dispatch events in same window
  const onCustom = (ev: Event) => {
    const c = ev as CustomEvent;
    if (!c.detail) return;
    // re-read the whole collection and emit
    try {
      const arr = JSON.parse(localStorage.getItem(key) || localStorage.getItem(collectionName) || '[]');
      cb(Array.isArray(arr) ? arr : []);
    } catch {
      cb([]);
    }
  };
  window.addEventListener(`realtime:${collectionName}`, onCustom as EventListener);

  // listen for storage events from other tabs
  const onStorage = (e: StorageEvent) => {
    if (!e.key) return;
    if (e.key === `__lastRealtimeEvent__${collectionName}` || e.key === key || e.key === collectionName) {
      try {
        const arr = JSON.parse(localStorage.getItem(key) || localStorage.getItem(collectionName) || '[]');
        cb(Array.isArray(arr) ? arr : []);
      } catch {
        cb([]);
      }
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    if (unsubFs) unsubFs();
    window.removeEventListener(`realtime:${collectionName}`, onCustom as EventListener);
    window.removeEventListener('storage', onStorage);
  };
}

export async function fetchCollectionOnce(collectionName: string) {
  const fdb = init();
  if (fdb) {
    try {
      const snap = await getDocs(collection(fdb, collectionName));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.warn('fetchCollectionOnce firestore failed', e);
    }
  }

  try {
    const arr = JSON.parse(localStorage.getItem(localKey(collectionName)) || localStorage.getItem(collectionName) || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default {
  init,
  addRealtimeDoc,
  subscribeToCollection,
  fetchCollectionOnce,
};
