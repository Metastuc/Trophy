import mongoose from "mongoose";
import { DB_URI } from "../utils/env";

// General container
const DB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI);
        console.log(`\x1b[36m%s\x1b[0m`, `DB: MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`\x1b[31m%s\x1b[0m`, `DB: MongoDB Connection Failure: ${error.message}`);
        process.exit(1);
    }
};

export default DB;
