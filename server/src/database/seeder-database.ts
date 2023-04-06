// Import dependencies
import colors from "colors";
import dotenv from "dotenv";

// Import modules
import database from "./config-database";
import { toTitleCase } from "../utils/string-helper";

// Import seeders
import userSeeder from "./seeders/user-seeder";

// Load environment variables
dotenv.config();

// Get environment variables
const debug = process.env.DEBUG_MODE === 'true';

// Set seeder
const seeders = [userSeeder];

// Create seeder
const seeder = {
    // Fresh: delete all data
    fresh: async () => {
        try {
            // Log started
            if (debug) console.log("\n[Deleting Data]");
    
            // Drop all collections
            const collections = await database.getCollections();
            for (const collection of collections) {
                await collection.dropIndexes();
                await collection.drop();
                if (debug) {
                    console.log(`Deleted Data: ${toTitleCase(collection.collectionName.replace('_', ' '))}`, colors.green("✔"));
                }
            }
    
            // Log completed
            if (debug) console.log("[Completed]\n");
        } catch (error) {
            console.log(error);
            if (debug) console.log("[Failed]");
            process.exit(1);
        }
    },

    // Seed: add data
    seed: async () => {
        // Log started
        if (debug) console.log("[Seeding Data]");

        // Loop seeders
        for (const seeder of seeders) {
            try {
                await seeder.seed().then(() => {
                    if (debug) console.log(`Seed Data: ${toTitleCase(seeder.label)}`, colors.green("✔"));
                });
            } catch (error) {
                console.log(error);
                if (debug) console.log("[Failed]");
                process.exit(1);
            }
        }

        // Close database connection
        await database.close().then(() => {
            if (debug) console.log(`[Completed]`);
            process.exit(0);
        });
    }
};

// Run seeder
database.connect().then(() => {
    if (process.argv[2] === "fresh") {
        seeder.fresh().then(() => { seeder.seed(); });
    } else {
        seeder.seed();
    }
});