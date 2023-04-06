// Import dependencies
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Load environment variables
dotenv.config();

// Get environment variables
const production = process.env.NODE_ENV === 'production';
const corsENV = {
    origin: process.env.CORS_ORIGIN ?? 'localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
};

// Define a fastify plugin
const corsSecurity: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Register the plugin on the fastify instance
    fastify.register(cors, {                                    // Enable CORS security for all routes
        origin: production ? corsENV.origin : '*',              //--- Allow only client URL when production
        credentials: corsENV.credentials,                       //--- Allow credentials
        methods: ['GET', 'POST', 'PUT', 'DELETE'],              //--- Allow only GET, POST, PUT, DELETE methods
        allowedHeaders: ['Content-Type', 'Authorization'],      //--- Allow only Content-Type and Authorization headers
    });
});

// Export the plugin as a module
export default corsSecurity;