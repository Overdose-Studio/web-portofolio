// Import dependencies
import dotenv from 'dotenv';
import plugin from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Load environment variables
dotenv.config();

// Get environment variables
const jwtENV = {
    cookie: {
        name: process.env.JWT_COOKIE_NAME ?? 'refresh_token',
        signed: process.env.COOKIE_SIGNED === 'true',
    },
    expiresIn: process.env.JWT_EXPIRES_IN ?? '10m',
    secret: process.env.JWT_SECRET ?? 'secret',
};

// Create JSON response plugin
const jwtAuthentication: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    fastify.register(jwt, {                     // Enable JWT authentication
        secret: jwtENV.secret,                  //--- Set JWT secret
        cookie: {                               //--- Set JWT cookie options
            cookieName: jwtENV.cookie.name,     //----- Set cookie name
            signed: jwtENV.cookie.signed,       //----- Set cookie to signed
        },
        sign: {                                 //--- Set JWT sign options
            expiresIn: jwtENV.expiresIn,        //----- Set token expiration time
        }
    });
});

// Export module
export default jwtAuthentication;