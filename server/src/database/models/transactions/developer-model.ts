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
import IDeveloperEducation from "../../documents/masters/developer-education-document";
import { IDeveloperEducationRequest } from "../../../interfaces/payload/developer-payload-interface";

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
//----------------------------------------------------------------------------------------------------//
// --- Get Photo
developerSchema.methods.getPhoto = async function (): Promise<IDeveloperPhoto | null> {
    // Check if photo exists
    if (!this.photo) return null;

    // Get photo document
    const photoDocument = await DeveloperPhoto
        .findById(this.photo)
        .select("-_id -created_at -updated_at");

    // Return photo document
    return photoDocument;
}

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
    return await this.getPhoto();
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

    // Save developer
    await this.save();

    // Return photo document
    return await this.getPhoto();
}

//----------------------------------------------------------------------------------------------------//

// --- Get Educations
developerSchema.methods.getEducations = async function (): Promise<IDeveloperEducation[] | null> {
    // Check if educations
    if (!this.educations) return null;

    // Get educations
    const educations = await DeveloperEducation
    .find({
        _id: { $in: this.educations }
    })
    .lean()
    .sort({ "year.start": -1 })
    .select("-created_at -updated_at");

    // Return educations
    return educations;
}

// --- Add Education
developerSchema.methods.addEducation = async function (data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]> {
    // Create education document
    const educationDocument = await DeveloperEducation.create({
        level: data.level,
        institution: data.institution,
        major: data.major,
        year: {
            start: data.year_start,
            end: data.year_end
        },
        description: data.description
    });

    // Add education to developer
    this.educations.push(educationDocument._id);

    // Save developer
    await this.save();
    
    // Return educations
    return await this.getEducations();
}

// --- Update Education
developerSchema.methods.updateEducation = async function (reply: FastifyReply, data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]> {
    // Check education id on developer
    if (!this.educations.includes(data._id)) {
        reply.status(500);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                education: `Education document does not exist, with id: ${data._id}`
            }
        };
        throw new Error(`Failed to update education on developer, please try again later or contact administrator`);
    }

    // Update education document
    await DeveloperEducation.findByIdAndUpdate(data._id, {
        level: data.level,
        institution: data.institution,
        major: data.major,
        year: {
            start: data.year_start,
            end: data.year_end
        },
        description: data.description
    });

    // Return educations
    return await this.getEducations();
}

// --- Delete Education
developerSchema.methods.deleteEducation = async function (reply: FastifyReply, ids: string[]): Promise<IDeveloperEducation[]> {
    // Check educations id on developer
    const invalidIds = ids.filter(id => !this.educations.includes(id));
    if (invalidIds.length > 0) {
        reply.status(500);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.NOT_FOUND,
            data: {
                education: `Education document does not exist, with id: ${invalidIds.join(", ")}`
            }
        };
        throw new Error(`Failed to delete education on developer, please try again later or contact administrator`);
    }

    // Delete educations
    await DeveloperEducation.deleteMany({
        _id: { $in: ids }
    });

    // Remove educations from developer
    this.educations = (this.educations as string[]).filter(id => !ids.includes(id));

    // Save developer
    await this.save();

    // Return educations
    return await this.getEducations();
}

//----------------------------------------------------------------------------------------------------//

// Create a developer model
const Developer = model<IDeveloper>("Developer", developerSchema);

// Export developer model
export default Developer;