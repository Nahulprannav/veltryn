import { io as clientIO, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function socketEnabled() {
  return Boolean(import.meta.env.VITE_SOCKET_URL);
}

export function connectSocket() {
  if (!socketEnabled()) return null;
  if (socket) return socket;
  const url = import.meta.env.VITE_SOCKET_URL || `${location.protocol}//${location.hostname}:4000`;
  socket = clientIO(url, { transports: ['websocket', 'polling'] });
  return socket;
}

export function addDoc(collection: string, doc: any) {
  const s = connectSocket();
  if (!s) return Promise.reject(new Error('Socket not enabled'));
  s.emit('add', { collection, doc });
  return Promise.resolve();
}

export function subscribeToCollection(collection: string, cb: (payload: any) => void) {
  const s = connectSocket();
  if (!s) return () => {};
  const handler = (msg: any) => cb(msg);
  s.on(`update:${collection}`, handler);
  // request immediate snapshot
  s.emit('get', collection, (items: any) => {
    cb({ all: items });
  });
  return () => {
    s.off(`update:${collection}`, handler);
  };
}

export function fetchCollectionOnce(collection: string): Promise<any[]> {
  return new Promise((resolve) => {
    const s = connectSocket();
    if (!s) return resolve([]);
    s.emit('get', collection, (items: any) => resolve(items || []));
  });
}
