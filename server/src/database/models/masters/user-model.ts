// Import dependencies
import { Schema, model } from "mongoose";

// Import documents
import IUser from "../../documents/masters/user-document";

// Import enums
import UserRole from "../../enums/user-role-enum";

// Import plugins
import softDelete from "../../../plugins/soft-delete-plugin";

// Create user schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.ADMIN,
    },
    password: {
        type: String,
        required: true,
    }
}, { 
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

// Add soft delete plugin
userSchema.plugin(softDelete);

// Create user model
const User = model<IUser>("User", userSchema);

// Export user model
export default User;