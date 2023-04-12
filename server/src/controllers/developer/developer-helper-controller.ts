// Import dependencies
import { FastifyRequest, FastifyReply} from 'fastify';

// Import enums
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IObjectIdParams } from '../../interfaces/payload/params-payload-interface';

// Import models
import Developer from '../../database/models/transactions/developer-model';

// Create helper function to check if developer exists
export const checkDeveloper = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer ID
    const { id } = request.params as IObjectIdParams;

    // Get developer
    const developer = await Developer
        .findById(id)
        .where('deleted_at')
        .equals(null);

    // Check if developer exists
    if (!developer) {
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: id
            }
        };
        throw new Error('Developer not found');
    } else {
        return developer;
    }
};