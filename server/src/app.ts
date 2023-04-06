// Import dependencies
import Fastify from 'fastify';
import helmet from '@fastify/helmet';

// Import middleware
import errorHandler from './middleware/error-handler-middleware';
import notFoundHandler from './middleware/not-found-handler-middleware';
import validatorCompiler from './middleware/validation-compiler-middleware';

// Import modules
import logger from './utils/logger';
import router from './routes/router';

// Import plugins
import cookieParser from './plugins/cookie-parser-plugin';
import corsSecurity from './plugins/cors-security-plugin';
import errorAttribute from './plugins/error-attribute-plugin';
import formBodyParser from './plugins/form-body-parser-plugin';
import jsonResponse from './plugins/json-response-plugin';

// Create fastify app
const app = Fastify({ logger: logger });

// Use plugins on the app
app.register(helmet);                                       // Set security HTTP headers
app.register(cookieParser);                                 // Parse and set cookies
app.register(formBodyParser);                               // Parse and set form data
app.register(corsSecurity);                                 // Enable CORS security for all routes
app.register(router);                                       // Register main router
app.register(jsonResponse);                                 // Register JSON response plugin (decorate reply object)
app.register(errorAttribute);                               // Register error attribute plugin (decorate reply object)
app.setErrorHandler(errorHandler);                          // Set error handler middleware (handle errors)
app.setNotFoundHandler(notFoundHandler);                    // Set not found handler middleware (handle 404 errors)
app.setValidatorCompiler(validatorCompiler);                // Set validator compiler middleware (handle validation errors)

// Export app
export default app;