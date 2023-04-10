// Import dependencies
import { FastifyReply } from "fastify";
import { Document, ObjectId } from "mongoose";

// Import enums
import { DeveloperType, DeveloperPhotoType } from "../../enums/developer-enum";

// Import interfaces
import IDeveloperPhoto from "../masters/developer-photo-document";
import TimestampDocument from "../../../interfaces/timestamp-document-interface";
import SoftDeleteDocument from "../../../interfaces/soft-delete-document-interface";

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
    setPhoto(reply: FastifyReply, data: { type: DeveloperPhotoType, path: string}): Promise<IDeveloperPhoto>;
    deletePhoto(reply: FastifyReply, types: DeveloperPhotoType[]): Promise<IDeveloperPhoto>;
}

// Export developer document
export default IDeveloper;