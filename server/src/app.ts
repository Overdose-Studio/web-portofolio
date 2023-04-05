// Import dependencies
import Fastify from 'fastify';
import helmet from '@fastify/helmet';

// Import modules
import logger from './utils/logger';

// Create fastify app
const app = Fastify({ logger: logger });

// Use plugins on the app
app.register(helmet);                                       // Set security HTTP headers

// Export app
export default app;