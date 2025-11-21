const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 4000;

// Persistence file
const DATA_FILE = path.join(__dirname, 'data.json');

// Load persisted store if available
let store = { messages: [], courseRegistrations: [], pageViews: [] };
async function loadStore() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    store = Object.assign({ messages: [], courseRegistrations: [], pageViews: [] }, parsed || {});
    console.log('Loaded store from', DATA_FILE);
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Failed to read data file:', err.message);
    else console.log('No existing data file; starting with empty store');
  }
}

let writeScheduled = false;
function schedulePersist() {
  if (writeScheduled) return;
  writeScheduled = true;
  setTimeout(async () => {
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to write data file:', err.message);
    } finally {
      writeScheduled = false;
    }
  }, 250);
}

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // send initial data for all collections
  socket.emit('initial', store);

  socket.on('add', ({ collection, doc }) => {
    if (!collection || !doc) return;
    if (!store[collection]) store[collection] = [];
    store[collection].push(doc);
    schedulePersist();
    // broadcast update to all clients
    io.emit(`update:${collection}`, { doc, all: store[collection] });
  });

  socket.on('get', (collection, cb) => {
    if (typeof cb === 'function') cb(store[collection] || []);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

app.get('/', (req, res) => res.send('Veltryn Socket.IO server running'));

(async () => {
  await loadStore();
  server.listen(PORT, () => {
    console.log(`Socket server listening on http://localhost:${PORT}`);
  });
})();
