// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import {
    getContact,
    addContact,
    updateContact,
    deleteContact
} from '../../controllers/developer/developer-contact-controller';

// Import schema validation
import { developerContactSchema, developerIdDeleteSchema } from '../../validations/developer-payload-validation';
import { idParamsSchema } from '../../validations/params-validation';

// Create router
const developerContactRouter = async (app: FastifyInstance) => {
    // Get all contact by developer ID
    app.get('/:id', {
        schema: idParamsSchema
    }, getContact);

    // Add contact by developer ID
    app.post('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerContactSchema({ id: false})
        }
    }, addContact);

    // Update contact by developer ID
    app.put('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerContactSchema({ id: true})
        }
    }, updateContact);

    // Delete contact by developer ID
    app.delete('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerIdDeleteSchema
        }
    }, deleteContact);
};

// Export main router
export default developerContactRouter;