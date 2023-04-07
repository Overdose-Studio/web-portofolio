// Import dependencies
import { Document, ObjectId } from "mongoose";

// Import enums
import UserAction from "../../enums/user-action-enum";

// Create a user log document
interface IUserLog extends Document {
    // Properties
    user: ObjectId;
    action: UserAction;
    description: string;
    created_at: Date;
}

// Export user log document
export default IUserLog;