// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import {
    uploadAvatar,
    uploadCover,
    deleteDeveloperPhoto
} from '../../controllers/developer/developer-photo-controller';

// Import middleware
import uploadHandlerMiddleware from '../../middleware/upload-handler-middleware';

// Import schema validation
import { developerPhotoSchema, developerPhotoDeleteSchema } from '../../validations/developer-payload-validation';
import { idParamsSchema } from '../../validations/params-validation';

// Create router
const developerPhotoRouter = async (app: FastifyInstance) => {
    // Upload developer avatar
    app.post('/:id/upload/avatar', {
        preHandler: uploadHandlerMiddleware({
            name: 'avatar',
            required: true,
            directory: 'developer/avatar',
            maxFiles: 1,
            mimeTypes: ['image/png', 'image/jpeg', 'image/jpg']
        }),
        schema: {...developerPhotoSchema('avatar'), ...idParamsSchema}
    }, uploadAvatar);

    // Upload developer cover
    app.post('/:id/upload/cover', {
        preHandler: uploadHandlerMiddleware({
            name: 'cover',
            required: true,
            directory: 'developer/cover',
            maxFiles: 1,
            mimeTypes: ['image/png', 'image/jpeg', 'image/jpg']
        }),
        schema: {...developerPhotoSchema('cover'), ...idParamsSchema}
    }, uploadCover);

    // Delete developer photo
    app.delete('/:id/delete', {
        schema: {...developerPhotoDeleteSchema, ...idParamsSchema}
    },deleteDeveloperPhoto);
};

// Export main router
export default developerPhotoRouter;