// Import dependencies
import { FastifyInstance } from 'fastify';

// Import models
import { StatusAPI } from '../../database/enums/api-enum';

// Import validation schemas
import { developerBasicSchema } from '../../validations/developer-payload-validation';

// Create router
const developerBasicRouter = async (app: FastifyInstance) => {
    app.post('/', { schema: developerBasicSchema }, async (request, reply) => {
        reply.json({
            status: StatusAPI.SUCCESS,
            status_code: 200,
            message: 'Hello World!',
            data: request.body
        })
    });
};

// Export main router
export default developerBasicRouter;