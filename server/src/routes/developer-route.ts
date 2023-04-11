// Import dependencies
import { FastifyInstance } from 'fastify';

// Import enums
import { UserRole } from '../database/enums/user-enum';

// Import middleware
import authMiddleware from '../middleware/auth-middleware';
import roleMiddleware from '../middleware/role-middleware';

// Import routes
import developerBasicRouter from './developer/developer-basic-route';
import developerPhotoRouter from './developer/developer-photo-route';

// Create router
const developerRouter = async (app: FastifyInstance) => {
    // Apply middleware
    app.addHook('preParsing', authMiddleware);
    app.addHook('preHandler', roleMiddleware(UserRole.ADMIN, UserRole.DEVELOPER));

    // Register other routes
    app.register(developerBasicRouter, { prefix: '/basic' });
    app.register(developerPhotoRouter, { prefix: '/photo' });
};

// Export main router
export default developerRouter;