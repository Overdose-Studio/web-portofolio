// Import dependencies
import { Document } from "mongoose";

// Import enums
import { DeveloperContactType } from "../../enums/developer-enum";

// Import interfaces
import { TimestampDocument } from "../../../interfaces/database/document-database-interface";

// Create a developer contact document
interface IDeveloperContact extends Document, TimestampDocument {
    // Properties
    type: DeveloperContactType;
    label: string;
    url: string;
}

// Export developer contact document
export default IDeveloperContact;