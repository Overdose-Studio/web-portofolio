// Import dependencies
import Fastify from 'fastify';

// Import modules
import logger from './utils/logger';

// Create fastify app
const app = Fastify({ logger: logger });

// Export app
export default app;