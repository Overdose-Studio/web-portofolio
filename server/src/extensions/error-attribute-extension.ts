// This file is used to extend the FastifyReply interface with the error property

// Import dependencies
import 'fastify';

// Import models
import ErrorAPI from '../database/enums/error-api-enum';
import StatusAPI from '../database/enums/status-api-enum';

// Create Error Properties interface
export type ErrorProperties = {
    status?: StatusAPI;     // StatusAPI: SUCCESS, FAILED, ERROR
    type?: ErrorAPI;        // ErrorAPI: ERR_VALIDATION, ERR_AUTHENTICATION
    data?: any;             // Data object (e.g. user object)
    meta?: any;             // Meta object (e.g. pagination object)
    links?: any;            // Links object (e.g. pagination links)
    included?: any;         // Included object (e.g. user object)
};

// Extend FastifyReply interface
declare module 'fastify' {
    // Create error reply interface
    interface FastifyReply {
        error: ErrorProperties;
    }
}