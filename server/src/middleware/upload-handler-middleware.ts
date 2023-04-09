// Import dependencies
import dotenv from 'dotenv';
import fs from 'fs';
import { FastifyRequest, FastifyReply } from 'fastify';

// Import models
import { ErrorAPI, StatusAPI } from '../database/enums/api-enum';

// Load environment variables
dotenv.config();

// Get environment variables
const uploadDirectory = process.env.MULTIPART_UPLOAD_DIR ?? 'public';

// Create multipart handler middleware
const uploadHandlerMiddleware = (directory: string = '', mimeTypes: string[] = []) => async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if request is multipart
    if (!request.isMultipart()) {
        // Send error response
        reply.status(400);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.VALIDATION,
            data: { request: 'Request must be form-data multipart' }
        }
        throw new Error('Validation failed, request must be form-data multipart');
    }

    // Check directory is valid using regex (allow recursive directory)
    const regex = /^[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)*$/;
    if (!regex.test(directory)) {
        // Send error response
        reply.status(500);
        reply.error = {
            status: StatusAPI.ERROR,
            type: ErrorAPI.UPLOAD,
            data: { directory: 'Directory must be alphanumeric, dash or underscore' }
        }
        throw new Error('Validation failed, directory must be alphanumeric, dash or underscore');
    }

    // Check if directory exists
    const path = `./${uploadDirectory}/${directory}`;
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    
    // Check mime types are valid 
    for (const mimeType of mimeTypes) {
        if (!mimeType.includes('/')) {
            // Send error response
            reply.status(500);
            reply.error = {
                status: StatusAPI.ERROR,
                type: ErrorAPI.UPLOAD,
                data: { mimeTypes: `Mime types "${mimeType}" must be in the format of "type/subtype"` }
            }
            throw new Error(`Validation failed, mime types "${mimeType}" must be in the format of "type/subtype"`);
        }
    }

    // Save files to temporary directory
    const files = await request.saveRequestFiles();

    // Check MIME type is valid
    const filesTypeInvalid: any = {};
    if (mimeTypes.length > 0) {
        // Create regex to check file type
        const regex = new RegExp(`(${mimeTypes.join('|').replace('*', '.*')})$`, 'i');

        // Check each file
        for (const file of files) {
            if (!regex.test(file.mimetype)) {
                filesTypeInvalid[file.fieldname] = `File ${file.filename} is not a valid file type, must be (${mimeTypes.join(', ')})`;
            }
        }

        // Send error response if any files are invalid
        if (Object.keys(filesTypeInvalid).length > 0) {
            reply.status(400);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.VALIDATION,
                data: filesTypeInvalid
            }
            throw new Error(`Validation failed, uploaded files must be (${mimeTypes.join(', ')})`);
        }
    }

    // Write file to upload directory
    for (const file of files) {
        console.log(file);

        // Create file path
        const filePath = `${path}/${Date.now()}-${file.filename}`;

        // Move file from temporary directory to upload directory
        fs.writeFileSync(filePath, await file.toBuffer());

        // Add details to request body
        request.body = request.body ?? {};
        (request.body as any)[file.fieldname] = filePath;
    }
};

// Export multipart handler middleware
export default uploadHandlerMiddleware;