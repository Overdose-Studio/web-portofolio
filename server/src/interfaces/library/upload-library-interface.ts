// Import interfaces
import { SavedMultipartFile } from '@fastify/multipart';

// Create upload file interface
export interface IUploadFiles {
    [key: string]: {
        fieldname: string;
        file: {
            bytesRead: number;
            truncated: boolean;
        }
        filename: string;
        mimetype: string;
        type: string;
    };
}

// Create upload handler interface
export interface IUploadHandler {
    name: string;               // Field name
    directory?: string;         // Upload directory
    required?: boolean;         // Is required
    maxFiles?: number;          // Max files per field
    mimeTypes?: string[];       // Mime types
};

// Create file body interface
export interface IFileBody extends SavedMultipartFile {
    path: string;                    // File path
    signed: string;                  // File signed
}