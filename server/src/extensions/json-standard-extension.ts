// This file is used to extend the FastifyReply interface with the json method

// Import dependencies
import 'fastify';

// Import interfaces
import StandardJSON from '../interfaces/library/json-standard-library-interface';

// Extend FastifyReply interface
declare module 'fastify' {
    // Create JSON response reply interface
    interface FastifyReply {
        json: (response: StandardJSON) => FastifyReply;
    }
}