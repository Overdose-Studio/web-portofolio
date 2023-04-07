// Import dependencies
import bcrypt from "bcrypt";
import { FastifyReply } from "fastify";
import { Schema, model } from "mongoose";

// Import documents
import IUser from "../../documents/masters/user-document";

// Import enums
import UserRole from "../../enums/user-role-enum";

// Import interfaces
import TokenPayloadJWT from "../../../interfaces/jwt-payload-interface";

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

// Create methods for user schema
// --- Compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// --- Get JWT payload
userSchema.methods.getPayloadJWT = function (): TokenPayloadJWT {
    return {
        _id: this._id,
        name: this.name,
        role: this.role,
    };
};

// --- Generate access token
userSchema.methods.generateAccessToken = async function (reply: FastifyReply): Promise<string> {
    const payload = this.getPayloadJWT();
    return reply.jwtSign(payload);
};

// --- Generate refresh token
userSchema.methods.generateRefreshToken = async function (reply: FastifyReply): Promise<string> {
    const payload = this.getPayloadJWT();
    return reply.jwtSign(payload, { expiresIn: '7d' });
};

// Create user model
const User = model<IUser>("User", userSchema);

// Export user model
export default User;