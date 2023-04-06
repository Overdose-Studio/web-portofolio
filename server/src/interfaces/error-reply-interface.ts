// Import dependencies
import { FastifyReply } from 'fastify';

// Import extensions
import { ErrorProperties } from '../extensions/error-attribute-extension';

// Create export interface that extends the FastifyReply interface
interface errorReply extends FastifyReply {
    error: ErrorProperties;
}

// Export interface
export default errorReply;
