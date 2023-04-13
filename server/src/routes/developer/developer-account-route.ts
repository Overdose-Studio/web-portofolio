// Import dependencies
import { FastifyInstance } from 'fastify';

// Import controllers
import {
    getAccount,
    registerAccount,
    changePassword,
    changeEmail,
    deleteAccount
} from '../../controllers/developer/developer-account-controller';

// Import schema validation
import { idParamsSchema } from '../../validations/params-validation';
import { developerAccountSchema, developerChangePasswordSchema } from '../../validations/developer-payload-validation';

// Create router
const developerAccountRouter = async (app: FastifyInstance) => {
    // Get developer account
    app.get('/:id', {
        schema: idParamsSchema
    }, getAccount);

    // Register developer account
    app.post('/:id', {
        schema: {
            ...idParamsSchema,
            ...developerAccountSchema({ password: true })
        }
    }, registerAccount);

    // Change developer password
    app.put('/:id/password', {
        schema: {
            ...idParamsSchema,
            ...developerChangePasswordSchema
        }
    }, changePassword);

    // Change developer email
    app.put('/:id/email', {
        schema: {
            ...idParamsSchema,
            ...developerAccountSchema({ password: false })
        }
    }, changeEmail);

    // Delete developer account
    app.delete('/:id', {
        schema: idParamsSchema
    }, deleteAccount);
};

// Export main router
export default developerAccountRouter;