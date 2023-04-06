// Import dependencies
import Fastify from 'fastify';
import helmet from '@fastify/helmet';

// Import modules
import logger from './utils/logger';

// Import plugins
import cookieParser from './plugins/cookie-parser-plugin';
import corsSecurity from './plugins/cors-security-plugin';
import formBodyParser from './plugins/form-body-parser-plugin';
import jsonResponse from './plugins/json-response-plugin';

// Create fastify app
const app = Fastify({ logger: logger });

// Use plugins on the app
app.register(helmet);                                       // Set security HTTP headers
app.register(cookieParser);                                 // Parse and set cookies
app.register(formBodyParser);                               // Parse and set form data
app.register(corsSecurity);                                 // Enable CORS security for all routes
app.register(jsonResponse);                                 // Register JSON response plugin (decorate reply object)

// Export app
export default app;