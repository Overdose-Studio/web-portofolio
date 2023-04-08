// Import dependencies
import { Schema, model } from "mongoose";

// Import documents
import IDeveloperPhoto from "../../documents/masters/developer-photo-document";

// Create a developer photo schema
const developerPhotoSchema = new Schema<IDeveloperPhoto>({
    avatar: {
        type: String,
        default: null
    },
    cover: {
        type: String,
        default: null
    }
}, {
    collection: "developer_photos",
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// Create a developer photo model
const DeveloperPhoto = model<IDeveloperPhoto>("DeveloperPhoto", developerPhotoSchema);

// Export developer photo model
export default DeveloperPhoto;