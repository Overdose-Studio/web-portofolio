// Import dependencies
import { Schema, model } from "mongoose";

// Import enums
import { DeveloperEducationLevel } from "../../enums/developer-enum";

// Import interfaces
import IDeveloperEducation from "../../documents/masters/developer-education-document";

// Create a developer education schema
const developerEducationSchema = new Schema<IDeveloperEducation>({
    level: {
        type: String,
        enum: Object.values(DeveloperEducationLevel),
        required: true
    },
    school: {
        type: String,
        required: true
    },
    major: {
        type: String,
        default: undefined
    },
    year: {
        start: {
            type: Number,
            required: true
        },
        end: {
            type: Number,
            default: undefined
        }
    },
    description: {
        type: String,
        default: undefined
    }
}, {
    collection: "developer_educations",
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// Create a developer education model
const DeveloperEducation = model<IDeveloperEducation>("DeveloperEducation", developerEducationSchema);

// Export developer education model
export default DeveloperEducation;