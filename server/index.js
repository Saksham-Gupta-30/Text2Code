import express from 'express';
import { func } from './openai.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/', async (req, res) => {
    const { text } = req.body;
    const response = await func(text);
    res.json(response.choices[0]);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})