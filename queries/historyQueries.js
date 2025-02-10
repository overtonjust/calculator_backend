import { db } from "../db/dbconfig.js";

const viewAllCalcs = async () => {
    try {
        const calcHistory = await db.any("SELECT * FROM history");
        return calcHistory;       
    } catch (error) {
        return error;
    }
};


export { viewAllCalcs };