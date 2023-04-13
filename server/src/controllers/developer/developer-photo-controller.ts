// Import dependencies
import fs from 'fs';
import { FastifyRequest, FastifyReply} from 'fastify';

// Import controllers
import { checkDeveloper } from './developer-helper-controller';

// Import enums
import { UserAction } from '../../database/enums/user-enum';
import { DeveloperPhotoType } from '../../database/enums/developer-enum';
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IObjectIdParams } from '../../interfaces/payload/params-payload-interface';
import { IDeveloperPhotoRequest, IDeveloperPhotoDeleteRequest } from '../../interfaces/payload/developer-payload-interface';

// Import models
import Developer from '../../database/models/transactions/developer-model';

// @desc   Get developer photo
// @route  GET /developer/photo/:id
// @access Private (Admin, Developer)
export const getPhoto = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get developer photo
    const developerPhoto = await developer.getPhoto();

    // Check if developer photo exists
    if (!developerPhoto) {
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: developer.id
            }
        }
        throw new Error(`Photo not found for developer ${developer.name}`);
    }

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Get photo for developer ${developer.name} successfully`,
        data: developerPhoto
    });
};

// @desc   Upload developer avatar photo
// @route  POST /developer/photo/:id/upload/avatar
// @access Private (Admin, Developer)
export const uploadAvatar = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get avatar file
    const { avatar } = request.body as IDeveloperPhotoRequest;

    // Set avatar file on developer
    const developerPhoto = await developer.setPhoto(reply, {
        type: DeveloperPhotoType.AVATAR,
        path: avatar.path
    });

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Set avatar photo for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Set avatar photo for developer ${developer.name} successfully`,
        data: developerPhoto
    });
};

// @desc   Upload developer cover photo
// @route  POST /developer/photo/:id/upload/cover
// @access Private (Admin, Developer)
export const uploadCover = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get cover file
    const { cover } = request.body as IDeveloperPhotoRequest;

    // Set cover file on developer
    const developerPhoto = await developer.setPhoto(reply, {
        type: DeveloperPhotoType.COVER,
        path: cover.path
    });

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Set cover photo for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Set cover photo for developer ${developer.name} successfully`,
        data: developerPhoto
    });
};

// @desc   Delete developer photo (delete cover and avatar)
// @route  DELETE /developer/photo/:id/delete
// @access Private (Admin, Developer)
export const deleteDeveloperPhoto = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if developer exists
    const developer = await checkDeveloper(request, reply);

    // Get data from request
    const { types } = request.body as IDeveloperPhotoDeleteRequest;

    // Set cover file on developer
    const developerPhoto = await developer.deletePhoto(reply, types);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.DELETE,
        description: `Delete ${types.join('and')} photo for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Delete ${types.join('and')} photo for developer ${developer.name} successfully`,
        data: developerPhoto
    });
};