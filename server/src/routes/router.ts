// Import dependencies
import { FastifyInstance } from 'fastify';

// Import routes
import csrfRouter from './csrf-route';

//!DEBUG
import StatusAPI from '../models/status-api-model';

// Create main router
const router = async (app: FastifyInstance) => {
    // Register other routes
    app.register(csrfRouter);               // CSRF route

    // Test route
    app.get('/', async (request, reply) => {
        reply.json({
            status: StatusAPI.SUCCESS,
            status_code: 200,
            message: 'Hello World!'
        })
    });
};

// Export main router
export default router;