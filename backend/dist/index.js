"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const firestore_1 = require("@google-cloud/firestore");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const db = new firestore_1.Firestore({
    projectId: 'proven-citizen-348106',
    keyFilename: process.env['GOOGLE_APPLICATION_CREDENTIALS'],
});
const app = (0, express_1.default)();
const port = 5000;
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello');
}));
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield db.collection('todo').get();
    const data = [];
    snapshot.forEach((doc) => {
        data.push(doc.data());
    });
    res.status(200).send(data);
}));
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = db.collection('todo');
    yield docRef.add(req.body);
    res.sendStatus(200);
}));
app.listen(port, () => {
    console.log(`app listening to server... http://localhost:${port}/`);
});
