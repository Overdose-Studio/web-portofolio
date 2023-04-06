// Import dependencies
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyPluginAsync } from 'fastify';

// Import interfaces
import JSON_Standard from '../interfaces/json-standard-interface';

// Create JSON response plugin
const jsonResponse: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Decorate the fastify instance with a custom function
    fastify.decorateReply('json', async function (this: FastifyReply, params: JSON_Standard) {
        // Send response using standard JSON
        this.send(params);
    });
});

// Export module
export default jsonResponse;