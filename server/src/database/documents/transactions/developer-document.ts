// Import dependencies
import { Document, ObjectId } from "mongoose";

// Import enums
import { DeveloperType } from "../../enums/developer-enum";

// Import interfaces
import { IDeveloperPhotoPlugin } from "../../plugins/developer-photo-plugin";
import { IDeveloperContactPlugin } from "../../plugins/developer-contact-plugin";
import { IDeveloperEducationPlugin } from "../../plugins/developer-education-plugin";
import { SoftDeleteDocument, TimestampDocument } from "../../../interfaces/database/document-database-interface";

// Create a developer document
interface IDeveloper extends
    Document,
    TimestampDocument,
    SoftDeleteDocument,
    IDeveloperContactPlugin,
    IDeveloperEducationPlugin,
    IDeveloperPhotoPlugin
{
    // Properties
    name: string;
    age: number;
    role: string[];
    type: DeveloperType;
    location: string;
    about: string;
    user: ObjectId;
}

// Export developer document
export default IDeveloper;