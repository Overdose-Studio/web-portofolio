// Import dependencies
import fs from "fs";
import { FastifyReply } from "fastify";
import { Schema, ObjectId } from "mongoose";

// Import enums
import { DeveloperPhotoType } from "../../database/enums/developer-enum";
import { ErrorAPI, StatusAPI } from "../../database/enums/api-enum";

// Import interfaces
import IDeveloperPhoto from "../documents/masters/developer-photo-document";

// Import models
import DeveloperPhoto from "../models/masters/developer-photo-model";

// Create interface for developer photo plugin
export interface IDeveloperPhotoPlugin {
    // Properties
    photo: ObjectId;

    // Methods
    getPhoto(): Promise<IDeveloperPhoto>;
    setPhoto(reply: FastifyReply, data: { type: DeveloperPhotoType, path: string }): Promise<IDeveloperPhoto>;
    deletePhoto(reply: FastifyReply, types: DeveloperPhotoType[]): Promise<IDeveloperPhoto>;
}

// Create a developer photo plugin
const developerPhotoPlugin = (schema: Schema) => {
    // Add field
    schema.add({
        photo: {
            type: Schema.Types.ObjectId,
            ref: DeveloperPhoto,
            default: null
        }
    });

    // Method: Get Photo
    schema.methods.getPhoto = async function (): Promise<IDeveloperPhoto | null> {
        // Check if photo exists
        if (!this.photo) return null;

        // Get photo document
        const photoDocument = await DeveloperPhoto
            .findById(this.photo)
            .select("-_id -created_at -updated_at");

        // Return photo document
        return photoDocument;
    }

    // Method: Set photo
    schema.methods.setPhoto = async function (reply: FastifyReply, data: { type: DeveloperPhotoType, path: string }): Promise<IDeveloperPhoto> {
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
        return await this.getPhoto();
    };

    // Method: Delete photo
    schema.methods.deletePhoto = async function (reply: FastifyReply, types: DeveloperPhotoType[]): Promise<IDeveloperPhoto | null> {
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

        // Save developer
        await this.save();

        // Return photo document
        return await this.getPhoto();
    }
};

// Export module
export default developerPhotoPlugin;