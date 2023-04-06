// This code defines a Fastify plugin 
// that adds an error attribute to the reply object.

// Import dependencies
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Define a fastify plugin
const errorAttribute: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Add an error attribute to the reply object using the onRequest hook
    fastify.addHook('onRequest', async (request, reply) => {
        // Add an error attribute to the reply object
        reply.error = {};
    });
});

// Export the plugin as a module
export default errorAttribute;