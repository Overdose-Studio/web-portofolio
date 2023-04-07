// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import {
    getAllDevelopers,
    getDeveloper,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper
} from '../../controllers/developer/developer-basic-controller';

// Import plugins
import paginationPlugin from '../../plugins/pagination-payload-plugin';

// Import validation schemas
import { idParamsSchema } from '../../validations/params-validation';
import { developerBasicSchema } from '../../validations/developer-payload-validation';

// Create router
const developerBasicRouter = async (app: FastifyInstance) => {
    app.get('/', paginationPlugin, getAllDevelopers);
    app.get('/:id', { schema: idParamsSchema }, getDeveloper);
    app.post('/', { schema: developerBasicSchema }, createDeveloper);
    app.put('/:id', { schema: { ...idParamsSchema, ...developerBasicSchema } }, updateDeveloper);
    app.delete('/:id', { schema: idParamsSchema }, deleteDeveloper);
};

// Export main router
export default developerBasicRouter;