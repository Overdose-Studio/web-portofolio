// This file is used to extend the FastifyReply interface with the json method

// Import dependencies
import 'fastify';

// Import interfaces
import JSON_Standard from '../interfaces/json-standard-interface';

// Extend FastifyReply interface
declare module 'fastify' {
    // Create JSON response reply interface
    interface FastifyReply {
        json: (response: JSON_Standard) => FastifyReply;
    }
}