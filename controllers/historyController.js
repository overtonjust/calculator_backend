import express from 'express';
const history = express.Router();

import {
    viewAllCalcs
} from '../queries/historyQueries.js';


history.get('/', async (req, res) => {
    const calcHistory = await viewAllCalcs();

    if(calcHistory[0]) {
        res.status(200).json(calcHistory)
    } else {
        res.status(500).json({error: "Server error"})
    }
});

export { history }