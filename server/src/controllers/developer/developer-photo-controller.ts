// Import dependencies
import fs from 'fs';
import { FastifyRequest, FastifyReply} from 'fastify';

// Import enums
import { UserAction } from '../../database/enums/user-enum';
import { DeveloperPhotoType } from '../../database/enums/developer-enum';
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IDeveloperPhotoRequest, IDeveloperPhotoDeleteRequest } from '../../interfaces/developer-interface';
import { IObjectIdParams } from '../../interfaces/params-interface';

// Import models
import Developer from '../../database/models/transactions/developer-model';

// @desc   Upload developer avatar photo
// @route  POST /developer/photo/:id/upload/avatar
// @access Private (Admin, Developer)
export const uploadAvatar = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer ID
    const { id } = request.params as IObjectIdParams;

    // Get avatar file
    const { avatar } = request.body as IDeveloperPhotoRequest;

    /// Get developer
    const developer = await Developer
        .findById(id)
        .where('deleted_at')
        .equals(null);

    // Throw error if developer does not exist
    if (!developer) {
        // Delete avatar file
        fs.unlinkSync(avatar.path);

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
        data: {
            id: developer._id,
            name: developer.name,
            age: developer.age,
            type: developer.type,
            location: developer.location,
            about: developer.about,
            photo: {
                avatar: developerPhoto.avatar,
                cover: developerPhoto.cover
            },
            updated_at: developer.updated_at,
        }
    });
};

// @desc   Upload developer cover photo
// @route  POST /developer/photo/:id/upload/cover
// @access Private (Admin, Developer)
export const uploadCover = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer ID
    const { id } = request.params as IObjectIdParams;

    // Get cover file
    const { cover } = request.body as IDeveloperPhotoRequest;

    /// Get developer
    const developer = await Developer
        .findById(id)
        .where('deleted_at')
        .equals(null);

    // Throw error if developer does not exist
    if (!developer) {
        // Delete cover file
        fs.unlinkSync(cover.path);

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
        data: {
            id: developer._id,
            name: developer.name,
            age: developer.age,
            type: developer.type,
            location: developer.location,
            about: developer.about,
            photo: {
                avatar: developerPhoto.avatar,
                cover: developerPhoto.cover
            },
            updated_at: developer.updated_at,
        }
    });
};

// @desc   Delete developer photo (delete cover and avatar)
// @route  DELETE /developer/photo/:id/delete
// @access Private (Admin, Developer)
export const deleteDeveloperPhoto = async (request: FastifyRequest, reply: FastifyReply) => {
    // Get developer ID
    const { id } = request.params as IObjectIdParams;

    // Get data from request
    const { types } = request.body as IDeveloperPhotoDeleteRequest;

    /// Get developer
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

    // Set cover file on developer
    const developerPhoto = await developer.deletePhoto(reply, types);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Delete ${types.join('and')} photo for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Delete ${types.join('and')} photo for developer ${developer.name} successfully`,
        data: {
            id: developer._id,
            name: developer.name,
            age: developer.age,
            type: developer.type,
            location: developer.location,
            about: developer.about,
            photo: {
                avatar: developerPhoto.avatar,
                cover: developerPhoto.cover
            },
            updated_at: developer.updated_at,
        }
    });
};