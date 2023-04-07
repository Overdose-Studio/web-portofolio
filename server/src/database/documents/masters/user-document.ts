// Import dependencies
import { Document } from "mongoose";
import { FastifyReply } from "fastify";

// Import interfaces
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
}

// Export user document
export default IUser;