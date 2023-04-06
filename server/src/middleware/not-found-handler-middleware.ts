//-------------------------------------------------------------------------------
//* Description: Middleware to handle 404 errors (Not Found)
//*              This middleware is used to handle 404 errors (Not Found)
//*              This middleware is set in src/app.ts
//-------------------------------------------------------------------------------

// Import dependencies
import { FastifyRequest, FastifyReply } from 'fastify';

// Import models
import ErrorAPI from '../database/enums/error-api-enum';
import StatusAPI from '../models/status-api-model';

// Create 404 handler middleware
const notFoundHandler = (request: FastifyRequest, reply: FastifyReply) => {
    // Set response status code
    reply.status(404);

    // Set response body
    reply.json({
        status: StatusAPI.FAILED,
        status_code: 404,
        code: ErrorAPI.NOT_FOUND,
        message: `The requested resource '${request.url}' could not be found`,
        meta: {
            path: request.url,
        }
    });
}

// Export module
export default notFoundHandler;