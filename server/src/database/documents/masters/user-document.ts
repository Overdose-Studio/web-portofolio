// Import dependencies
import { Document } from "mongoose";
import { FastifyReply } from "fastify";

// Import enums
import { UserAction } from "../../enums/user-enum";

// Import interfaces
import IUserLog from "../transactions/user-log-document";
import { ITokenPayloadJWT } from "../../../interfaces/payload/jwt-payload-interface";
import { SoftDeleteDocument, TimestampDocument } from "../../../interfaces/database/document-database-interface";

// Create a user document
interface IUser extends Document, TimestampDocument, SoftDeleteDocument {
    // Properties
    name: string;
    email: string;
    role: string;
    password: string;

    // Methods
    comparePassword(password: string): Promise<boolean>;
    getPayloadJWT(): ITokenPayloadJWT;
    generateAccessToken(reply: FastifyReply): Promise<string>;
    generateRefreshToken(reply: FastifyReply): Promise<string>;
    createLog(reply: FastifyReply, data: { action: UserAction, description: string }): Promise<IUserLog>;
}

// Export user document
export default IUser;