// Import dependencies
import { Schema, model } from "mongoose";

// Import documents
import IDeveloper from "../../documents/transactions/developer-document";

// Import enums
import { DeveloperType } from "../../enums/developer-enum";

// Import models
import DeveloperContact from "../masters/developer-contact-model";
import DeveloperEducation from "../masters/developer-education-model";
import DeveloperPhoto from "../masters/developer-photo-model";
import User from "../masters/user-model";

// Import plugins
import softDelete from "../../../plugins/soft-delete-plugin";

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
    photo: {
        type: Schema.Types.ObjectId,
        ref: DeveloperPhoto,
        default: null
    },
    educations: [{
        type: Schema.Types.ObjectId,
        ref: DeveloperEducation,
        default: null
    }],
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: DeveloperContact,
        default: null
    }],
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

// Add soft delete plugin
developerSchema.plugin(softDelete);

// Create a developer model
const Developer = model<IDeveloper>("Developer", developerSchema);

// Export developer model
export default Developer;