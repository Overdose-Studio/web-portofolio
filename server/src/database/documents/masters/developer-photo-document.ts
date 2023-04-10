// Import dependencies
import { Document } from "mongoose";

// Import interfaces
import TimestampDocument from "../../../interfaces/timestamp-document-interface";

// Create a developer photo document
interface IDeveloperPhoto extends Document, TimestampDocument {
    // Properties
    avatar: string;
    cover: string;
}

// Export developer photo document
export default IDeveloperPhoto;