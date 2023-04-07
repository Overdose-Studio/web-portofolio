// Import dependencies
import { FastifyRequest, FastifyReply } from 'fastify';

// Import enums
import { ErrorAPI, StatusAPI } from '../database/enums/api-enum';

// Import models
import User from '../database/models/masters/user-model';

// Create auth middleware to check if user is authenticated
const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    // Verify token
    await request.jwtVerify((err, decoded) => {
        // Check if error occurs
        if (err) {
            // Set error response
            err.details = { token: err.message }
            if (err.code === 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE' || err.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
                err.message = 'Authentication failed, please login again';
            } else {
                err.message = 'Session expired, please login again';
            }
            
            // Throw error
            throw err;
        }
    })

    // Set user data on request
    try {
        // Find user data (exclude password)
        const user = await User.findById(request.user._id).select('-password -__v -deleted_at');

        // Send error when user isn't found
        if (!user) {
            throw new Error('User not found');
        }
        
        // Set user data
        request.user = user;
    } catch (error) {
        // Send error response
        reply.status(401);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.AUTHENTICATION,
            data: { token: 'Token invalid', user: 'User not found' }
        }
        throw new Error('Authentication failed, please login again');
    }
};

// Export auth middleware
export default authMiddleware;