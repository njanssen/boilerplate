import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

import orca from './orca.js';

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
});

orca.on('data',(path,...data) => {
    io.emit('data', path, ...data);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
