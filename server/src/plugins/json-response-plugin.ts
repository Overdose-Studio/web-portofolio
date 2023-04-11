// Import dependencies
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyPluginAsync } from 'fastify';

// Import interfaces
import StandardJSON from '../interfaces/library/json-standard-library-interface';

// Create JSON response plugin
const jsonResponse: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Decorate the fastify instance with a custom function
    fastify.decorateReply('json', async function (this: FastifyReply, params: StandardJSON) {
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