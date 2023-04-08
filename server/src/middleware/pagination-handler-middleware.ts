// Import dependencies
import { FastifyRequest, FastifyReply } from 'fastify';

// Import enums
import { ErrorAPI, StatusAPI } from '../database/enums/api-enum';

// Import interfaces
import { IPaginationQuery } from '../interfaces/pagination-interface';

// Create pagination handler middleware
const paginationHandlerMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get pagination search query
    const { search } = request.query as { search: string };

    // Parse search query
    if (search) {
        try {
            (request.query as IPaginationQuery).search = JSON.parse(search);
        } catch (error) {
            // Set response when error occurs
            reply.status(400);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.PAGINATION,
                data: {
                    search: search
                }
            };
            throw new Error('Cannot parse search query, please check your search query');
        }
    }
};

// Export pagination handler middleware
export default paginationHandlerMiddleware;