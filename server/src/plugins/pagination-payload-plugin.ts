// Import middleware
import paginationHandlerMiddleware from '../middleware/pagination-handler-middleware';

// Import schemas validation
import { paginationQuerySchema } from '../validations/pagination-payload-validation';

// Create pagination plugin
const paginationPlugin = {
    onRequest: [paginationHandlerMiddleware],
    schema: paginationQuerySchema
}

// Export pagination plugin
export default paginationPlugin;