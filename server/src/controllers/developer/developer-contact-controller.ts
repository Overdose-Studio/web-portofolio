// Import dependencies
import { FastifyRequest, FastifyReply} from 'fastify';

// Import controllers
import { checkDeveloper } from './developer-helper-controller';

// Import enums
import { UserAction } from '../../database/enums/user-enum';
import { ErrorAPI, StatusAPI } from '../../database/enums/api-enum';

// Import interfaces
import { IDeveloperContactRequest } from '../../interfaces/payload/developer-payload-interface';

// @desc   Get all contact by developer ID
// @route  GET /developer/contact/:id
// @access Private (Admin, Developer)
export const getContact = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check developer
    const developer = await checkDeveloper(request, reply);

    // Get contacts
    const contacts = await developer.getContacts();

    // Check if contacts exists
    if (contacts.length === 0) {
        reply.status(404);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                id: developer.id
            }
        }
        throw new Error(`Contacts not found for developer ${developer.name}`);
    }

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Get contacts for developer ${developer.name} successfully`,
        data: contacts,
        meta: {
            total: contacts.length
        }
    });
};

// @desc   Add contact by developer ID
// @route  POST /developer/contact/:id
// @access Private (Admin, Developer)
export const addContact = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check developer
    const developer = await checkDeveloper(request, reply);

    // Add contact
    const developerContact = await developer.addContact(reply, request.body as IDeveloperContactRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.CREATE,
        description: `Add contact for developer ${developer.name}`
    });

    // Send response
    reply.status(201);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Add contact for developer ${developer.name} successfully`,
        data: developerContact
    });
};

// @desc   Update contact by developer ID
// @route  PUT /developer/contact/:id
// @access Private (Admin, Developer)
export const updateContact = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check developer
    const developer = await checkDeveloper(request, reply);

    // Update contact
    const developerContact = await developer.updateContact(reply, request.body as IDeveloperContactRequest);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.UPDATE,
        description: `Update contact for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Update contact for developer ${developer.name} successfully`,
        data: developerContact
    });
};

// @desc   Delete contact by developer ID
// @route  DELETE /developer/contact/:id
// @access Private (Admin, Developer)
export const deleteContact = async (request: FastifyRequest, reply: FastifyReply) => {
    // Check developer
    const developer = await checkDeveloper(request, reply);

    // Get educations ID from request body
    const { _ids } = request.body as IDeveloperContactRequest;

    // Delete contact
    const developerContact = await developer.deleteContact(reply, _ids);

    // Create user log
    await request.user.createLog(reply, {
        action: UserAction.DELETE,
        description: `Delete contact for developer ${developer.name}`
    });

    // Send response
    reply.status(200);
    reply.json({
        status: StatusAPI.SUCCESS,
        message: `Delete contact for developer ${developer.name} successfully`,
        data: developerContact
    });
};