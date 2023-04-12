// Import dependencies
import { FastifyRequest, FastifyReply} from 'fastify';

// Import controllers
import { checkDeveloper } from './developer-helper-controller';

// Import enums
import { UserAction } from '../../database/enums/user-enum';
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IDeveloperEducationRequest } from '../../interfaces/payload/developer-payload-interface';

// @desc   Get all education by developer ID
// @route  GET /developer/education/:id
// @access Private (Admin, Developer)
export const getEducation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get educations
    const educations = await developer.getEducations();

    // Check if educations exists
    if (educations.length === 0) {
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: developer.id
            }
        }
        throw new Error(`Educations not found for developer ${developer.name}`);
    }

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Get educations for developer ${developer.name} successfully`,
        data: educations,
        meta: {
            total: educations.length
        }
    });
};

// @desc   Add education by developer ID
// @route  POST /developer/education/:id
// @access Private (Admin, Developer)
export const addEducation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Add education
    const developerEducation = await developer.addEducation(request.body as IDeveloperEducationRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Add education for developer ${developer.name}`
    });

    // Send response
    reply.status(201);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Add education for developer ${developer.name} successfully`,
        data: developerEducation
    });
};

// @desc   Update education by developer ID
// @route  PUT /developer/education/:id
// @access Private (Admin, Developer)
export const updateEducation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Update education
    const developerEducation = await developer.updateEducation(reply, request.body as IDeveloperEducationRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Update education for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Update education for developer ${developer.name} successfully`,
        data: developerEducation
    });
};

// @desc   Delete education by developer ID
// @route  DELETE /developer/education/:id
// @access Private (Admin, Developer)
export const deleteEducation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get educations ID from request body
    const { _ids } = request.body as IDeveloperEducationRequest;

    // Delete education
    const developerEducation = await developer.deleteEducation(reply, _ids);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.DELETE,
        description: `Delete education for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Delete education for developer ${developer.name} successfully`,
        data: developerEducation
    });
};