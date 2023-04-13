// Import dependencies
import { FastifyRequest, FastifyReply} from 'fastify';

// Import controllers
import { checkDeveloper } from './developer-helper-controller';

// Import enums
import { UserAction } from '../../database/enums/user-enum';
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IDeveloperAccountRequest } from '../../interfaces/payload/developer-payload-interface';

// @desc   Get developer account
// @route  GET /developer/account/:id
// @access Private (Admin)
export const getAccount = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get account
    const account = await developer.getAccount(reply);

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Get account for developer ${developer.name} successfully`,
        data: {
            id: account.id,
            name: account.name,
            email: account.email,
            created_at: account.created_at,
            updated_at: account.updated_at
        }
    });
};

// @desc   Register developer account
// @route  POST /developer/account/:id
// @access Private (Admin)
export const registerAccount = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Register account
    const account = await developer.registerAccount(reply, request.body as IDeveloperAccountRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.CREATE,
        description: `Register account for developer ${developer.name}`
    });

    // Send response
    reply.status(201);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Register account for developer ${developer.name} successfully`,
        data: {
            id: account.id,
            name: account.name,
            email: account.email,
            created_at: account.created_at,
            updated_at: account.updated_at
        }
    });
};

// @desc   Change developer password
// @route  PUT /developer/account/:id/password
// @access Private (Admin)
export const changePassword = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Change password
    const account = await developer.changePassword(reply, request.body as IDeveloperAccountRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Change password for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Change password for developer ${developer.name} successfully`,
        data: {
            id: account.id,
            name: account.name,
            email: account.email,
            created_at: account.created_at,
            updated_at: account.updated_at
        }
    });
};

// @desc   Change developer email
// @route  PUT /developer/account/:id/email
// @access Private (Admin)
export const changeEmail = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Change email
    const account = await developer.changeEmail(reply, request.body as IDeveloperAccountRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Change email for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Change email for developer ${developer.name} successfully`,
        data: {
            id: account.id,
            name: account.name,
            email: account.email,
            created_at: account.created_at,
            updated_at: account.updated_at
        }
    });
};

// @desc   Delete developer account
// @route  DELETE /developer/account/:id
// @access Private (Admin)
export const deleteAccount = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Delete account
    const account = await developer.deleteAccount(reply);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.DELETE,
        description: `Delete account for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Delete account for developer ${developer.name} successfully`,
        data: {
            id: account.id,
            name: account.name,
            email: account.email,
            created_at: account.created_at,
            updated_at: account.updated_at,
            deleted_at: account.deleted_at
        }
    });
};