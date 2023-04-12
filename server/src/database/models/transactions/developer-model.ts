// Import dependencies
import { Schema, model } from "mongoose";

// Import documents
import IDeveloper from "../../documents/transactions/developer-document";

// Import enums
import { DeveloperType } from "../../enums/developer-enum";

// Import models
import User from "../masters/user-model";

// Import plugins
import developerContactPlugin from "../../plugins/developer-contact-plugin";
import developerEducationPlugin from "../../plugins/developer-education-plugin";
import developerPhotoPlugin from "../../plugins/developer-photo-plugin";
import softDeletePlugin from "../../plugins/soft-delete-plugin";

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

// Register plugins
developerSchema.plugin(softDeletePlugin);
developerSchema.plugin(developerContactPlugin);
developerSchema.plugin(developerEducationPlugin);
developerSchema.plugin(developerPhotoPlugin);

// Create a developer model
const Developer = model<IDeveloper>("Developer", developerSchema);

// Export developer model
export default Developer;