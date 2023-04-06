// Import dependencies
import { FastifyInstance } from 'fastify';

// Import models
import StatusAPI from '../../database/enums/status-api-enum';

// Create router
const testRoute = async (app: FastifyInstance) => {
    app.get('/', async (request, reply) => {
        reply.json({
            status: StatusAPI.SUCCESS,
            status_code: 200,
            message: 'Hello World!'
        })
    });
};

// Export main router
export default testRoute;