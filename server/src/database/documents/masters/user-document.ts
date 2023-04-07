// Import dependencies
import { Document } from "mongoose";
import { FastifyReply } from "fastify";

// Import enums
import UserAction from "../../enums/user-action-enum";

// Import interfaces
import IUserLog from "../transactions/user-log-document";
import TokenPayloadJWT from "../../../interfaces/jwt-payload-interface";

// Create a user document
interface IUser extends Document {
    // Properties
    name: string;
    email: string;
    role: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    // Methods
    comparePassword(password: string): Promise<boolean>;
    getPayloadJWT(): TokenPayloadJWT;
    generateAccessToken(reply: FastifyReply): Promise<string>;
    generateRefreshToken(reply: FastifyReply): Promise<string>;
    createLog(reply: FastifyReply, data: { action: UserAction, description: string }): Promise<IUserLog>;
}

// Export user document
export default IUser;