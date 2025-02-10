const db = require('../db/dbconfig');

const viewAllCalcs = async () => {
    try {
        const calcHistory = await db.any("SELECT * FROM history");
        return calcHistory;       
    } catch (error) {
        return error;
    }
};


module.exports = { viewAllCalcs };