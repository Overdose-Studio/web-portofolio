// Import dependencies
import { mongo, Connection } from "mongoose";

// Create interface
interface Database {
    connect: () => Promise<void>;                                           // Connect to database
    getCollections: () => Promise<mongo.Collection<mongo.BSON.Document>[]>  // Get all collections
    getConnection: () => Promise<Connection>                                // Get connection
    close: () => Promise<void>                                              // Close connection
}

// Export interface
export default Database;