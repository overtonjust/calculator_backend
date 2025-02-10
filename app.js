import express from 'express';
import cors from 'cors';
import { history as historyController } from './controllers/historyController.js';
const app = express();

app.use(express.json());
app.use(cors('*'));
app.use('/history', historyController);

app.get("/", (req, res) => {
    res.send("Welcome to the Calculator!")
});

app.get("*", (req, res) => {
    res.status(404).json({error: "Path not found"})
});

export { app }