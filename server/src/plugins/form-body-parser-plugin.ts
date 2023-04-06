// Import dependencies
import dotenv from 'dotenv';
import formBody from '@fastify/formbody';
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Load environment variables
dotenv.config();

// Get environment variables
const formBodyENV = {
    bodyLimit: parseInt(process.env.BODY_LIMIT ?? '1048576'),
};

// Define a fastify plugin
const formBodyParser: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Register the plugin on the fastify instance
    fastify.register(formBody, {                // Parse and set form data
        bodyLimit: formBodyENV.bodyLimit,       //--- Set body limit to default 1 MB
    });
});

// Export the plugin as a module
export default formBodyParser;