// Import dependencies
import dotenv from 'dotenv';
import cookie from '@fastify/cookie';
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Load environment variables
dotenv.config();

// Get environment variables
const cookieENV = {
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
    httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
    secure: process.env.COOKIE_SECURE === 'true',
    secret: process.env.COOKIE_SECRET ?? 'secret',
    signed: process.env.COOKIE_SIGNED === 'true',
};

// Define a fastify plugin
const cookieParser: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Register the plugin on the fastify instance
    fastify.register(cookie, {                                  // Parse and set cookies
        secret: cookieENV.secret,                               //--- Set cookie secret
        parseOptions: {                                         //--- Set parse options
            signed: cookieENV.signed,                           //------ Set cookie to signed
            secure: cookieENV.secure,                           //------ Set cookie to only valid for HTTPS when production
            httpOnly: cookieENV.httpOnly,                       //------ Set cookie to only valid for HTTP
            sameSite: 'strict',                                 //------ Set cookie to only valid for same site
            domain: cookieENV.domain,                           //------ Set cookie domain to localhost when production
        }
    });
});

// Export the plugin as a module
export default cookieParser;