// Import dependencies
import { FastifyReply } from "fastify";
import { Document, ObjectId } from "mongoose";

// Import enums
import { DeveloperType, DeveloperPhotoType } from "../../enums/developer-enum";

// Import interfaces
import IDeveloperPhoto from "../masters/developer-photo-document";
import IDeveloperEducation from "../masters/developer-education-document";
import { IDeveloperEducationRequest } from "../../../interfaces/payload/developer-payload-interface";
import { SoftDeleteDocument, TimestampDocument } from "../../../interfaces/database/document-database-interface";

// Create a developer document
interface IDeveloper extends Document, TimestampDocument, SoftDeleteDocument {
    // Properties
    name: string;
    age: number;
    role: string[];
    type: DeveloperType;
    location: string;
    photo: ObjectId;
    educations: ObjectId[];
    contacts: ObjectId[];
    about: string;
    user: ObjectId;

    // Methods
    getPhoto(): Promise<IDeveloperPhoto>;
    setPhoto(reply: FastifyReply, data: { type: DeveloperPhotoType, path: string }): Promise<IDeveloperPhoto>;
    deletePhoto(reply: FastifyReply, types: DeveloperPhotoType[]): Promise<IDeveloperPhoto>;
    getEducations(): Promise<IDeveloperEducation[]>;
    addEducation(data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]>;
    updateEducation(reply: FastifyReply, data: IDeveloperEducationRequest): Promise<IDeveloperEducation[]>;
    deleteEducation(reply: FastifyReply, ids: string[]): Promise<IDeveloperEducation[]>;
}

// Export developer document
export default IDeveloper;