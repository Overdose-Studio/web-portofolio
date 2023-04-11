// Import dependencies
import { FastifyRequest, FastifyReply} from 'fastify';

// Import enums
import { UserAction } from '../../database/enums/user-enum';
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IObjectIdParams } from '../../interfaces/payload/params-payload-interface';
import { IDeveloperBasicRequest } from '../../interfaces/payload/developer-payload-interface';

// Import models
import Developer from '../../database/models/transactions/developer-model';

// Import utils
import { getPaginatedData } from '../../utils/pagination';

// @desc   Get all developers
// @route  GET /developer/basic
// @access Private (Admin, Developer)
export const getAllDevelopers = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get all developers
    const result = await getPaginatedData(Developer, reply, request, {
        select: ['-educations', '-contacts', '-user', '-created_at', '-updated_at']
    });

    // Check pagination result
    if (result.data.length === 0) {
        // Set response when error occurs
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            meta: result.meta
        };
        throw new Error('Developers not found, please check your pagination query');
    }

    // Send response
    reply.code(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: 'Get all developers successfully',
        data: result.data,
        meta: result.meta
    });
};

// @desc   Get developer
// @route  GET /developer/basic/:id
// @access Private (Admin, Developer)
export const getDeveloper = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer id
    const { id } = request.params as IObjectIdParams;

    // Get developer
    const developer = await Developer
        .findById(id)
        .where('deleted_at')
        .equals(null);

    // Throw error if developer does not exist
    if (!developer) {
        // Set response when error occurs
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: id
            }
        };
        throw new Error('Developer not found');
    }

    // Send response
    reply.code(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: 'Get developer successfully',
        data: developer
    });
};

// @desc   Create developer
// @route  POST /developer/basic
// @access Private (Admin, Developer)
export const createDeveloper = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer basic request
    const { name, age, type, location, about } = request.body as IDeveloperBasicRequest;

    // Create developer
    const developer = await Developer.create({
        name: name,
        age: age,
        type: type,
        location: location,
        about: about
    });

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.CREATE,
        description: `Create developer ${developer.name}`
    });

    // Send response
    reply.code(201);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Create developer ${developer.name} successfully`,
        data: {
            id: developer._id,
            name: developer.name,
            age: developer.age,
            type: developer.type,
            location: developer.location,
            about: developer.about,
            created_at: developer.created_at,
        }
    });
};

// @desc   Update developer
// @route  PUT /developer/basic/:id
// @access Private (Admin, Developer)
export const updateDeveloper = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer id
    const { id } = request.params as IObjectIdParams;

    // Get developer basic request
    const { name, age, type, location, about } = request.body as IDeveloperBasicRequest;

    // Get developer
    const developer = await Developer
        .findById(id)
        .where('deleted_at')
        .equals(null);

    // Throw error if developer does not exist
    if (!developer) {
        // Set response when error occurs
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: id
            }
        };
        throw new Error('Developer not found');
    }

    // Update developer
    developer.name = name;
    developer.age = age;
    developer.type = type;
    developer.location = location;
    developer.about = about;
    await developer.save();

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Update developer ${developer.name}`
    });

    // Send response
    reply.code(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Update developer ${developer.name} successfully`,
        data: {
            id: developer._id,
            name: developer.name,
            age: developer.age,
            type: developer.type,
            location: developer.location,
            about: developer.about,
            updated_at: developer.updated_at,
        }
    });
};

// @desc   Delete developer
// @route  DELETE /developer/basic/:id
// @access Private (Admin, Developer)
export const deleteDeveloper = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer id
    const { id } = request.params as IObjectIdParams;

    // Get developer
    const developer = await Developer
        .findById(id)
        .where('deleted_at')
        .equals(null);

    // Throw error if developer does not exist
    if (!developer) {
        // Set response when error occurs
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: id
            }
        };
        throw new Error('Developer not found');
    }

    // Delete developer
    await developer.softDelete();

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.DELETE,
        description: `Delete developer ${developer.name}`
    });

    // Send response
    reply.code(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Delete developer ${developer.name} successfully`,
        data: {
            id: developer._id,
            name: developer.name,
            age: developer.age,
            type: developer.type,
            location: developer.location,
            about: developer.about,
            deleted_at: developer.deleted_at,
        }
    });
};