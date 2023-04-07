// Import dependencies
import { Schema, model } from "mongoose";

// Import documents
import IDeveloperContact from "../../documents/masters/developer-contact-document";

// Import enums
import { DeveloperContactType } from "../../enums/developer-enum";

// Create a developer contact schema
const developerContactSchema = new Schema<IDeveloperContact>({
    type: {
        type: String,
        enum: Object.values(DeveloperContactType),
        required: true
    },
    label: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    collection: "developer_contacts",
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// Create a developer contact model
const DeveloperContact = model<IDeveloperContact>("DeveloperContact", developerContactSchema);

// Export developer contact model
export default DeveloperContact;