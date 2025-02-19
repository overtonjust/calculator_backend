const { db } = require('../db/dbconfig.js');

const viewAllCalcs = async () => {
    try {
        const calcHistory = await db.any(`
            SELECT hd.time_recorded, json_agg(json_build_object('id', h.id, 'calculation', h.calculation)) AS calculations
            FROM history h
            JOIN history_dates hd ON h.history_date_id = hd.id
            GROUP BY hd.time_recorded
            ORDER BY hd.time_recorded
        `);
        return calcHistory;       
    } catch (error) {
        return error;
    }
};

const addCalcToHistory = async (calculation) => {
    try {
        const addedCalc = await db.tx(async transact => {
            const dateId = await transact.oneOrNone(
                "SELECT id FROM history_dates WHERE time_recorded = CURRENT_DATE"
            );

            let historyDateId;

            if(dateId) {
                historyDateId = dateId.id;
            } else {
                const insertedDate = await transact.one(
                    "INSERT INTO history_dates (time_recorded) VALUES (CURRENT_DATE) RETURNING id"
                );
                historyDateId = insertedDate.id;
            }

            return transact.one(
                "INSERT INTO history (calculation, history_date_id) VALUES ($1, $2) RETURNING *",
                [calculation, historyDateId]
            );
        });

        return addedCalc;
    } catch (error) {
        return error;
    }
}

const updateExistingCalc = async (calculation, calcId) => {
    try {
        const updatedCalc = await db.one('UPDATE history set calculation = $1 WHERE id = $2 RETURNING *', [
            calculation,
            calcId
        ]);
        return updatedCalc;

    } catch (error) {
        return error;
    }
}

const deleteCalculationById = async (calcId) => {
    try {
        const deletedCalc = await db.one('DELETE FROM history WHERE id = $1 RETURNING *', calcId);
        return deletedCalc;
    } catch (error) {
        return error;
    }
}

module.exports = { viewAllCalcs, addCalcToHistory, updateExistingCalc, deleteCalculationById };