// Import dependencies
import { Schema, model } from "mongoose";

// Import documents
import IUserLog from "../../documents/transactions/user-log-document";

// Import enums
import UserAction from "../../enums/user-action-enum";

// Create user log schema
const userLogSchema = new Schema<IUserLog>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    action: {
        type: String,
        enum: Object.values(UserAction),
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    collection: "user_logs",
    timestamps: {
        createdAt: "created_at",
        updatedAt: false
    }
});

// Create user log model
const UserLog = model<IUserLog>("UserLog", userLogSchema);

// Export user log model
export default UserLog;