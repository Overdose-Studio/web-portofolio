// Import dependencies
import dotenv from 'dotenv';
import { FastifyRequest, FastifyReply } from 'fastify';

// Import enums
import StatusAPI from '../database/enums/status-api-enum';
import ErrorAPI from '../database/enums/error-api-enum';

// Import interfaces
import { ILoginRequest } from '../interfaces/auth-payload-interface';

// Import models
import User from '../database/models/masters/user-model';

// Load environment variables
dotenv.config();

// Get environment variables
const jwt = {
    maxAge: parseInt(process.env.JWT_COOKIE_MAX_AGE ?? '604800000'),
};

// @desc    Authenticate user
// @route   POST /login
// @access  Public
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get request body
    const { email, password, remember } = request.body as ILoginRequest;

    // Check if user exists
    const user = await User.findOne({ email }).select('-__v -deleted_at');

    // Throw error if user does not exist
    if (!user || !(await user.comparePassword(password))) {
        // Set response when error occurs
        reply.status(401);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.AUTHENTICATION,
            data: {
                email: 'Email or password is incorrect',
                password: 'Email or password is incorrect'
            }
        };
        throw new Error('Authentication failed, please check your credentials');
    }

    // Create token
    const token = await user.generateAccessToken(reply);

    // Create refresh token
    const refreshToken = await user.generateRefreshToken(reply);

    // Set cookie for refresh token
    reply.setCookie('refresh_token', refreshToken, {
        path: '/',                                                              // Cookie is valid for all routes
        expires: remember ? new Date(Date.now() + jwt.maxAge) : undefined,      // Cookie expires after 7 days
    });
    
    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        status_code: 200,
        message: 'User authenticated successfully',
        data: {
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            },
            token: token
        }
    });
};