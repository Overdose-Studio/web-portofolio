// Import dependencies
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyPluginAsync } from 'fastify';

// Import interfaces
import JSON_Standard from '../interfaces/json-standard-interface';

// Create JSON response plugin
const jsonResponse: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Decorate the fastify instance with a custom function
    fastify.decorateReply('json', async function (this: FastifyReply, params: JSON_Standard) {
        // Get status response
        const { status, ...rest } = params;

        // Send response using standard JSON format
        this.send({
            status: status,
            status_code: rest.status_code ?? this.statusCode,
            ...rest
        });
    });
});

// Export module
export default jsonResponse;