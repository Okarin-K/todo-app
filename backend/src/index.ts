import express from 'express';
import dotenv from 'dotenv';
import { Firestore } from '@google-cloud/firestore';
import cors from 'cors';
import path from 'path';

dotenv.config();

const db = new Firestore({
    projectId: 'proven-citizen-348106',
    keyFilename: process.env['GOOGLE_APPLICATION_CREDENTIALS'],
});

const app = express();
const port = 5000;

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

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