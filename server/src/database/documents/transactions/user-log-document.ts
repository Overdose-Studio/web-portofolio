// Import dependencies
import { Document, ObjectId } from "mongoose";

// Import enums
import { UserAction } from "../../enums/user-enum";

// Import interfaces
import { TimestampDocument } from "../../../interfaces/database/document-database-interface";

// Create a user log document
interface IUserLog extends Document, TimestampDocument {
    // Properties
    user: ObjectId;
    action: UserAction;
    description: string;
}

// Export user log document
export default IUserLog;