// Import dependencies
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

// Import interfaces
import { Database } from "../interfaces/database/config-database-interface";

// Load environment variables
dotenv.config();

// Get environment variables
const debug = process.env.DEBUG_MODE === 'true';
const databaseENV = {
    name: process.env.DB_NAME ?? "test",
    URI: process.env.DB_URI ?? "mongodb://localhost:27017",
}

// Set strictQuery to false
mongoose.set("strictQuery", false);

// Create database connection
const database: Database = {
    // Connect to database
    connect: async () => {
        try {
            const conn = await mongoose.connect(`${databaseENV.URI}/${databaseENV.name}`);
            if (debug) {
                console.log(`Connected to database:`, colors.green(conn.connection.name), `(${conn.connection.host})`);
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    },

    // Get all collections
    getCollections: async () => {
        try {
            const collections = await mongoose.connection.db.collections();
            return collections;
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    },

    // Get connection
    getConnection: async () => {
        try {
            const conn = await mongoose.connection;
            return conn;
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    },

    // Close connection
    close: async () => {
        try {
            await mongoose.connection.close();
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
};

// Export database connection
export default database;