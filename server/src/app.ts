// Import dependencies
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import dotenv from 'dotenv';
import helmet from '@fastify/helmet';

// Import modules
import logger from './utils/logger';

// Load environment variables
dotenv.config();

// Get environment variables
const cookieENV = {
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
    httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? '86400000'),
    secure: process.env.COOKIE_SECURE === 'true',
    secret: process.env.COOKIE_SECRET ?? 'secret',
    signed: process.env.COOKIE_SIGNED === 'true',
};

// Create fastify app
const app = Fastify({ logger: logger });

// Use plugins on the app
app.register(helmet);                                       // Set security HTTP headers
app.register(cookie, {                                      // Parse and set cookies
    secret: cookieENV.secret,                               //--- Set cookie secret
    parseOptions: {                                         //--- Set parse options
        signed: cookieENV.signed,                           //------ Set cookie to signed
        secure: cookieENV.secure,                           //------ Set cookie to only valid for HTTPS when production
        httpOnly: cookieENV.httpOnly,                       //------ Set cookie to only valid for HTTP
        sameSite: 'strict',                                 //------ Set cookie to only valid for same site
        domain: cookieENV.domain,                           //------ Set cookie domain to localhost when production
        maxAge: cookieENV.maxAge,                           //------ Set cookie max age to default 1 day
    }
});

// Export app
export default app;