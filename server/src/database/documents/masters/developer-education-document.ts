// Import dependencies
import { Document } from "mongoose";

// Import enums
import { DeveloperEducationLevel } from "../../enums/developer-enum";

// Import interfaces
import TimestampDocument from "../../../interfaces/timestamp-document-interface";

// Create a developer education document
interface IDeveloperEducation extends Document, TimestampDocument {
    // Properties
    level: DeveloperEducationLevel;
    school: string;
    major: string;
    year: {
        start: number;
        end: number;
    };
    description: string;
}

// Export developer education document
export default IDeveloperEducation;