// Import dependencies
import dotenv from 'dotenv';
import csrf from '@fastify/csrf-protection';
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Load environment variables
dotenv.config();

// Get environment variables
const production = process.env.NODE_ENV === 'production';
const cookieENV = {
    signed: process.env.COOKIE_SIGNED === 'true',
};

// Define a fastify plugin
const csrfSecurity: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Register the plugin on the fastify instance
    fastify.register(csrf, {                                    // Enable CSRF protection
        cookieOpts: {                                           //--- Set cookie options
            signed: cookieENV.signed,                           //--- Set cookie to signed
        }
    });

    // Add hook to check CSRF token (only for POST, PUT, DELETE requests)
    if (production) fastify.addHook('onRequest', (request, reply, done) => {
        // Check CSRF token for POST, PUT, DELETE requests
        if (request.raw.method !== 'GET') {
            fastify.csrfProtection(request, reply, done);
        } else {
            // Skip GET requests
            done();
        }
    });
});

// Export the plugin as a module
export default csrfSecurity;