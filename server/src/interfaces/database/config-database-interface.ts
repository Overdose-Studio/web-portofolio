// Import dependencies
import { mongo, Connection } from "mongoose";

// Import interfaces
import '@fastify/jwt';
import "../../extensions/error-attribute-extension";

// Create interface ConfigDatabase
export interface Database {
    connect: () => Promise<void>;                                           // Connect to database
    getCollections: () => Promise<mongo.Collection<mongo.BSON.Document>[]>  // Get all collections
    getConnection: () => Promise<Connection>                                // Get connection
    close: () => Promise<void>                                              // Close connection
}

// Create interface Seeder
export interface Seeder {
    label: string;                      // Label: name of seeder (plural)
    seed: () => Promise<void>;          // Seed: function to seed data
}