//------------------------------------------------------------
//* Description: This file contains the extensions for the
//*              validation and joi modules to add custom
//*              properties to the error object
//------------------------------------------------------------

// Import dependencies
import 'joi';
import 'fastify';

// Extend ValidationError interface
declare module 'joi' {
    interface ValidationError {
        code: string;
    }
}

// Extend FastifyError interface
declare module 'fastify' {
    interface FastifyError {
        details: any;
    }
}