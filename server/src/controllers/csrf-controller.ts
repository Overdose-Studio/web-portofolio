// Import dependencies
import dotenv from 'dotenv';
import { FastifyRequest, FastifyReply} from 'fastify';

// Import models
import { StatusAPI } from '../database/enums/api-enum';

// Load environment variables
dotenv.config();

// Get environment variables
const production = process.env.NODE_ENV === 'production';

// @desc   Generate CSRF token
// @route  GET /csrf-token
// @access Public
export const generateCSRFToken = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check on production
    if (!production) {
        // Set response body
        reply.status(403);
        reply.error = {
            status: StatusAPI.ERROR,
            data: {
                csrf_token: 'CSRF token can only be generated on production'
            }
        };
        throw new Error('CSRF token can only be generated on production');
    }

    // Generate CSRF token
    const token = await reply.generateCsrf();

    // Set response body
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: 'CSRF token generated successfully',
        data: {
            csrf_token: token
        }
    });
}