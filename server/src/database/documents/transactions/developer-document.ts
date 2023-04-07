// Import dependencies
import { Document, ObjectId } from "mongoose";

// Import enums
import { DeveloperType } from "../../enums/developer-enum";

// Import interfaces
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
}

// Export developer document
export default IDeveloper;