import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('listening on *:3000');
});
