//------------------------------------------------------------
//* Description: This file contains the error handler middleware
//*              that is used to handle errors in the app
//*              and return a JSON response
//------------------------------------------------------------

// Import dependencies
import dotenv from 'dotenv';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';

// Import models
import { StatusAPI } from '../database/enums/api-enum';

// Import modules
import app from '../app';

// Load environment variables
dotenv.config();

// Get environment variables
const production = process.env.NODE_ENV === 'production';

// Create error handler middleware
const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    // Log error
    app.log.error(error);

    // Get data from request object and error 
    const { status, data, meta, links, included, type } = reply.error;
    const { statusCode, code, message, stack, details } = error

    // Set response status code
    const htmlStatus = statusCode ?? reply.statusCode ?? 500;
    reply.status(htmlStatus !== 200 ? htmlStatus : 500);

    // Set response body
    reply.json({
        status: status ? status : StatusAPI.ERROR,
        status_code: htmlStatus !== 200 ? htmlStatus : 500,
        code: type ?? code,
        message: message,
        data: data ?? details,
        meta: meta,
        links: links,
        included: included,
        stack: production ? undefined : stack
    });
};

// Export module
export default errorHandler;