// Import dependencies
import { FastifyReply } from "fastify";
import { Schema, ObjectId } from "mongoose";

// Import enums
import { ErrorAPI, StatusAPI } from "../../database/enums/api-enum";

// Import interfaces
import IDeveloperContact from "../documents/masters/developer-contact-document";
import { IDeveloperContactRequest } from "../../interfaces/payload/developer-payload-interface";

// Import models
import DeveloperContact from "../models/masters/developer-contact-model";

// Create interface for developer contact plugin
export interface IDeveloperContactPlugin {
    // Properties
    contacts: ObjectId[];

    // Methods
    getContacts(): Promise<IDeveloperContact[]>;
    addContact(reply: FastifyReply, data: IDeveloperContactRequest): Promise<IDeveloperContact[]>;
    updateContact(reply: FastifyReply, data: IDeveloperContactRequest): Promise<IDeveloperContact[]>;
    deleteContact(reply: FastifyReply, ids: string[]): Promise<IDeveloperContact[]>;
}

// Create a developer contact plugin
const developerContactPlugin = (schema: Schema) => {
    // Add field
    schema.add({
        contacts: [{
            type: Schema.Types.ObjectId,
            ref: DeveloperContact,
            default: null
        }]
    });

    // Method: Get Contacts
    schema.methods.getContacts = async function (): Promise<IDeveloperContact[] | null> {
        // Check if contacts
        if (!this.contacts) return null;

        // Get contacts
        const contacts = await DeveloperContact
        .find({
            _id: { $in: this.contacts }
        })
        .lean()
        .sort({ "type": 1 })
        .select("-created_at -updated_at");

        // Return contacts
        return contacts;
    }

    // Method: Add Contact
    schema.methods.addContact = async function (reply: FastifyReply, data: IDeveloperContactRequest): Promise<IDeveloperContact[]> {
        // Check contact id on developer (max 4)
        if (this.contacts && this.contacts.length >= 4) {
            reply.status(400);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.MAXIMUM_REACHED,
                data: {
                    contact: `Maximum contacts reached, maximum is 4`
                }
            };
            throw new Error(`Failed to add contact on developer, please remove a contact first`);
        }


        // Create contact document
        const contactDocument = await DeveloperContact.create({
            type: data.type,
            label: data.label,
            url: data.url
        });

        // Add contact to developer
        this.contacts.push(contactDocument._id);

        // Save developer
        await this.save();

        // Return contacts
        return await this.getContacts();
    }

    // Method: Update Contact
    schema.methods.updateContact = async function (reply: FastifyReply, data: IDeveloperContactRequest): Promise<IDeveloperContact[]> {
        // Check contact id on developer
        if (!this.contacts.includes(data._id)) {
            reply.status(500);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.NOT_FOUND,
                data: {
                    contact: `Contact document does not exist, with id: ${data._id}`
                }
            };
            throw new Error(`Failed to update contact on developer, please try again later or contact administrator`);
        }

        // Update contact document
        await DeveloperContact.findByIdAndUpdate(data._id, {
            type: data.type,
            label: data.label,
            url: data.url
        });

        // Return contacts
        return await this.getContacts();
    }

    // Method: Delete Contact
    schema.methods.deleteContact = async function (reply: FastifyReply, ids: string[]): Promise<IDeveloperContact[]> {
        // Check contacts id on developer
        const invalidIds = ids.filter(id => !this.contacts.includes(id));
        if (invalidIds.length > 0) {
            reply.status(500);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.NOT_FOUND,
                data: {
                    contact: `Contact document does not exist, with id: ${invalidIds.join(", ")}`
                }
            };
            throw new Error(`Failed to delete contact on developer, please try again later or contact administrator`);
        }

        // Delete contacts
        await DeveloperContact.deleteMany({
            _id: { $in: ids }
        });

        // Remove contacts from developer
        this.contacts = (this.contacts as string[]).filter(id => !ids.includes(id.toString()));

        // Save developer
        await this.save();

        // Return contacts
        return await this.getContacts();
    }
};

// Export developer contact plugin
export default developerContactPlugin;