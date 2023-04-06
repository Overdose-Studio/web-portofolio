// Import dependencies
import dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';

// Import routes
import csrfRouter from './csrf-route';
import testRoute from './optional/test-route';

// Load environment variables
dotenv.config();

// Get environment variables
const production = process.env.NODE_ENV === 'production';

// Create main router
const router = async (app: FastifyInstance) => {
    // Register other routes
    app.register(csrfRouter);                                           // CSRF route
    if (!production) app.register(testRoute, { prefix: '/test' });      // Test route (only in development)
};

// Export main router
export default router;