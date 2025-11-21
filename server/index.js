const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 4000;

// In-memory stores (demo only). Consider persistent storage for production.
const store = {
  messages: [],
  courseRegistrations: [],
  pageViews: [],
};

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // send initial data for all collections
  socket.emit('initial', store);

  socket.on('add', ({ collection, doc }) => {
    if (!collection || !doc) return;
    if (!store[collection]) store[collection] = [];
    store[collection].push(doc);
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

server.listen(PORT, () => {
  console.log(`Socket server listening on http://localhost:${PORT}`);
});
