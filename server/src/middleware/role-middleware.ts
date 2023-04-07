// Import dependencies
import { FastifyRequest, FastifyReply } from 'fastify';

// Import enums
import { ErrorAPI, StatusAPI } from '../database/enums/api-enum';
import UserRole from '../database/enums/user-role-enum';

// Create auth middleware to check if user is authenticated
const roleMiddleware = (...role: UserRole[]) => async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if user role is allowed
    if (!role.includes(request.user.role as UserRole)) {
        // Send error response
        reply.status(403);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.AUTHORIZATION,
            data: { role: 'Role not allowed' }
        }
        throw new Error('Authorization failed, you are not allowed to access this resource');
    }
}
// Export auth middleware
export default roleMiddleware;