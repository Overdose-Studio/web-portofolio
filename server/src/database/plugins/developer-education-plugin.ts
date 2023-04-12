// Import dependencies
import { FastifyReply } from "fastify";
import { Schema, ObjectId } from "mongoose";

// Import enums
import { ErrorAPI, StatusAPI } from "../../database/enums/api-enum";

// Import interfaces
import IDeveloperEducation from "../documents/masters/developer-education-document";
import { IDeveloperEducationRequest } from "../../interfaces/payload/developer-payload-interface";

// Import models
import DeveloperEducation from "../models/masters/developer-education-model";

// Create interface for developer education plugin
export interface IDeveloperEducationPlugin {
    // Properties
    educations: ObjectId[];

    // Methods
    getEducations(): Promise<IDeveloperEducation[]>;
    addEducation(data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]>;
    updateEducation(reply: FastifyReply, data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]>;
    deleteEducation(reply: FastifyReply, ids: string[]): Promise<IDeveloperEducation[]>;
}

// Create a developer education plugin
const developerEducationPlugin = (schema: Schema) => {
    // Add field
    schema.add({
        educations: [{
            type: Schema.Types.ObjectId,
            ref: DeveloperEducation,
            default: null
        }]
    });

    // Method: Get Educations
    schema.methods.getEducations = async function (): Promise<IDeveloperEducation[] | null> {
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

    // Method: Add Education
    schema.methods.addEducation = async function (data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]> {
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

    // Method: Update Education
    schema.methods.updateEducation = async function (reply: FastifyReply, data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]> {
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

    // Method: Delete Education
    schema.methods.deleteEducation = async function (reply: FastifyReply, ids: string[]): Promise<IDeveloperEducation[]> {
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
        this.educations = (this.educations as string[]).filter(id => !ids.includes(id.toString()));

        // Save developer
        await this.save();

        // Return educations
        return await this.getEducations();
    }
};

// Export module
export default developerEducationPlugin;