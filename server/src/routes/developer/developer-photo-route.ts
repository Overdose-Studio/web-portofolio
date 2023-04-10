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

// Create router
const developerPhotoRouter = async (app: FastifyInstance) => {
    // Upload developer avatar
    app.post('/:id/upload/avatar', {
        preHandler: uploadHandlerMiddleware({
            fields: ['avatar'],
            directory: 'developer/avatar',
            mimeTypes: ['image/png', 'image/jpeg', 'image/jpg']
        })
    }, uploadAvatar);

    // Upload developer cover
    app.post('/:id/upload/cover', {
        preHandler: uploadHandlerMiddleware({
            fields: ['cover'],
            directory: 'developer/cover',
            mimeTypes: ['image/png', 'image/jpeg', 'image/jpg']
        })
    }, uploadCover);

    // Delete developer photo
    app.delete('/:id/delete', deleteDeveloperPhoto);
};

// Export main router
export default developerPhotoRouter;