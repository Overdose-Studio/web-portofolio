// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import {
    getEducation,
    addEducation,
    updateEducation,
    deleteEducation
} from '../../controllers/developer/developer-education-controller';

// Import schema validation
import { developerEducationSchema, developerIdDeleteSchema } from '../../validations/developer-payload-validation';
import { idParamsSchema } from '../../validations/params-validation';

// Create router
const developerEducationRouter = async (app: FastifyInstance) => {
    // Get all education by developer ID
    app.get('/:id', {
        schema: idParamsSchema
    }, getEducation);

    // Add education by developer ID
    app.post('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerEducationSchema({ id: false })
        }
    }, addEducation);

    // Update education by developer ID
    app.put('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerEducationSchema({ id: true })
        }
    }, updateEducation);

    // Delete education by developer ID
    app.delete('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerIdDeleteSchema
        }
    }, deleteEducation);
};

// Export main router
export default developerEducationRouter;