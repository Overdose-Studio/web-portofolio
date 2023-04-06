// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import { generateCSRFToken } from '../controllers/csrf-controller';

// Create router
const csrfRouter = async (app: FastifyInstance) => {
    app.get('/csrf-token', generateCSRFToken);
};

// Export main router
export default csrfRouter;