import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import clientRoutes from '../routes/clientRouter.js';
import messageRoutes from '../routes/messageRouter.js';
import utilityRoutes from '../routes/utilityRouter.js';
import cron from 'node-cron';
import {sendScheduledMessages} from '../services/sendingService.js';
import emitter from "./emmiter.js";
import {checkClientExpired} from "../services/clientService.js";

cron.schedule('* * * * *', async () => {
    console.log('Checking for scheduled messages...');
    const result = await sendScheduledMessages();
    emitter.emit('update', 'messages');
    if (result) {
        console.log(result);
    }
});

cron.schedule('0 * * * *', async () => {
    console.log('Checking for clients...');
    const result = await checkClientExpired();
    emitter.emit('update', 'clients');
    if (result) {
        console.log(result);
    }
});

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.use('/client', clientRoutes);
server.use('/message', messageRoutes);
server.use('/utility', utilityRoutes);

server.get('/connect', (req, res) => {
    console.log('New client connected');

    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    });

    res.write(`data: Connected to server\n\n`);

    emitter.on('update', (queryKey) => {
        res.write(`data: ${queryKey}\n\n`);
    });

    req.on('close', () => {
        console.log('Client disconnected');
        res.end();
    });
});

export default server;