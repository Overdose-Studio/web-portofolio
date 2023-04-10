// Import dependencies
import fs from "fs";
import { FastifyReply } from "fastify";
import { Schema, model } from "mongoose";

// Import documents
import IDeveloper from "../../documents/transactions/developer-document";

// Import enums
import { ErrorAPI, StatusAPI } from "../../enums/api-enum";
import { DeveloperType, DeveloperPhotoType } from "../../enums/developer-enum";

// Import interfaces
import IDeveloperPhoto from "../../documents/masters/developer-photo-document";

// Import models
import DeveloperContact from "../masters/developer-contact-model";
import DeveloperEducation from "../masters/developer-education-model";
import DeveloperPhoto from "../masters/developer-photo-model";
import User from "../masters/user-model";

// Import plugins
import softDelete from "../../../plugins/soft-delete-plugin";

// Create a developer schema
const developerSchema = new Schema<IDeveloper>({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    type: {
        type: String,
        enum: [...Object.values(DeveloperType), null],
        default: null
    },
    location: {
        type: String,
        default: null
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: DeveloperPhoto,
        default: null
    },
    educations: [{
        type: Schema.Types.ObjectId,
        ref: DeveloperEducation,
        default: null
    }],
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: DeveloperContact,
        default: null
    }],
    about: {
        type: String,
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        default: null
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// Add soft delete plugin
developerSchema.plugin(softDelete);

// Create methods for developer schema
// --- Set photo
developerSchema.methods.setPhoto = async function (reply: FastifyReply, data: { type: DeveloperPhotoType, path: string }): Promise<IDeveloperPhoto> {
    // Get type and path
    const { type, path } = data;

    // Create a photo document
    let photoDocument: IDeveloperPhoto | null;

    // Check if photo exists
    if (!this.photo) {
        // Create a photo document
        photoDocument = await DeveloperPhoto.create({
            [type]: path
        });

        // Set photo on developer
        this.photo = photoDocument._id;
    } else {
        // Get photo document
        photoDocument = await DeveloperPhoto.findById(this.photo);

        // Throw error if photo document does not exist
        if (!photoDocument) {
            reply.status(500);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.NOT_FOUND,
                data: {
                    photo: `Photo document does not exist, with id: ${this.photo}`
                }
            };
            throw new Error(`Failed to set photo on developer, please try again later or contact administrator`);
        }

        // Remove old photo
        if (photoDocument[type]) fs.unlinkSync(photoDocument[type]);

        // Set photo on photo document
        photoDocument[type] = path;

        // Save photo document
        await photoDocument.save();
    }

    // Save developer
    await this.save();

    // Return photo document
    return photoDocument;
};

// --- Delete photo
developerSchema.methods.deletePhoto = async function (reply: FastifyReply, types: DeveloperPhotoType[]): Promise<IDeveloperPhoto | null> {
    // Check if photo exists
    if (!this.photo) return null;

    // Get photo document
    let photoDocument = await DeveloperPhoto.findById(this.photo);

    // Throw error if photo document does not exist
    if (!photoDocument) {
        reply.status(500);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                photo: `Photo document does not exist, with id: ${this.photo}`
            }
        };
        throw new Error(`Failed to set photo on developer, please try again later or contact administrator`);
    }

    // Loop through types
    for (const type of types) {
        // Remove old photo
        if (photoDocument[type]) fs.unlinkSync(photoDocument[type]);

        // Set photo on photo document
        await DeveloperPhoto.findByIdAndUpdate(this.photo, { [type]: null });
    }

    // Update photo document
    photoDocument = await DeveloperPhoto.findById(this.photo);

    // Save developer
    await this.save();

    // Return photo document
    return photoDocument;
}

// Create a developer model
const Developer = model<IDeveloper>("Developer", developerSchema);

// Export developer model
export default Developer;