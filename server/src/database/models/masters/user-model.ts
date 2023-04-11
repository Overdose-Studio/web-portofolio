// Import dependencies
import bcrypt from "bcrypt";
import { FastifyReply } from "fastify";
import { Schema, model } from "mongoose";

// Import documents
import IUser from "../../documents/masters/user-document";

// Import enums
import { ErrorAPI, StatusAPI } from "../../enums/api-enum";
import { UserAction, UserRole } from "../../enums/user-enum";

// Import interfaces
import IUserLog from "../../documents/transactions/user-log-document";
import { ITokenPayloadJWT } from "../../../interfaces/payload/jwt-payload-interface";

// Import models
import UserLog from "../transactions/user-log-model";

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
userSchema.methods.getPayloadJWT = function (): ITokenPayloadJWT {
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

// --- Create log
userSchema.methods.createLog = async function (reply: FastifyReply, data: { action: UserAction, description: string }): Promise<IUserLog> {
    try {
        // Validate user 
        if (!this._id) throw new Error(`User not found`);

        // Create user log
        const userLog = await UserLog.create({
            user: this._id,
            action: data.action,
            description: data.description,
        });

        // Return user log
        return userLog;
    } catch (error: any) {
        reply.status(500);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.USER_LOG
        };
        throw new Error(`Failed to generate user log, please contact administrator`);
    }
}

// Create user model
const User = model<IUser>("User", userSchema);

// Export user model
export default User;