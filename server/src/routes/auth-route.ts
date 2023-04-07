// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import { login } from '../controllers/auth-controller';

// Import validation schemas
import { loginSchema } from '../validations/auth-payload-validation';

// Create router
const authRouter = async (app: FastifyInstance) => {
    app.post('/login', { schema: loginSchema }, login);
};

// Export main router
export default authRouter;