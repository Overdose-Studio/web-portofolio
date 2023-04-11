// Import dependencies
import '@fastify/jwt';

// Import interfaces
import IUser from '../database/documents/masters/user-document';
import { ITokenPayloadJWT } from "../interfaces/payload/jwt-payload-interface";

// Extend TokenError interface
declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: ITokenPayloadJWT;
        user: IUser;
    }
}

// Extend Error interface on global scope
declare global {
    // Add details property to Error interface
    interface Error {
        code: string;
        details: any;
    }
}