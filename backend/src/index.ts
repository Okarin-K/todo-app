import { Firestore } from '@google-cloud/firestore';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { cert, initializeApp } from 'firebase-admin/app';
import { verifyIdToken } from './auth/verifyIdToken';

dotenv.config();

const serviceAccount = require('../serviceAccountKey.json');
initializeApp({
    credential: cert(serviceAccount),
});

const db = new Firestore({
    projectId: 'todo-app-ca00b',
    keyFilename: process.env['FIRE_BASE_CREDENTIALS'],
});

const app = express();
const port = 5000;

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use(verifyIdToken);

app.get('/ping', async (req, res) => {
    res.send('Hello');
});

app.get('/todos', async (req, res) => {
    const snapshot = await db.collection('todo').get();

    const data: FirebaseFirestore.DocumentData = [];
    snapshot.forEach((doc) => {
        data.push(doc.data());
    });

    res.status(200).send(data);
});

app.post('/todos', async (req, res) => {
    const docRef = db.collection('todo');

    await docRef.add(req.body);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`app listening to server... http://localhost:${port}/`);
});
