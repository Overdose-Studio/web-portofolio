// Import dependencies
import dotenv from 'dotenv';
import fs from 'fs';
import { SavedMultipartFile } from '@fastify/multipart';
import { FastifyRequest, FastifyReply } from 'fastify';

// Import interfaces
import { IUploadHandler } from '../interfaces/upload-interface';

// Import models
import { ErrorAPI, StatusAPI } from '../database/enums/api-enum';

// Load environment variables
dotenv.config();

// Get environment variables
const uploadDirectory = process.env.MULTIPART_UPLOAD_DIR ?? 'public';

// Create multipart handler middleware
const uploadHandlerMiddleware = ({
    fields,
    maxFilesField = 1,
    directory = '',
    mimeTypes = []
}: IUploadHandler) => async (request: FastifyRequest, reply: FastifyReply) => {
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

    // Check if files is more than max files
    const filesExceeded: any = {};
    for (const file of files) {
        // Check if file is not in fields
        if(!fields.includes(file.fieldname)) continue;

        // Check if file is more than max files
        if (files.filter((f: SavedMultipartFile) => f.fieldname === file.fieldname).length > maxFilesField) {
            filesExceeded[file.fieldname] = `Uploaded files is more than max files (${maxFilesField})`;
        }
    }

    // Send error response if any files are exceeded
    if (Object.keys(filesExceeded).length > 0) {
        reply.status(400);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.VALIDATION,
            data: filesExceeded
        }
        throw new Error(`Validation failed, uploaded files must be less than or equal to (${maxFilesField})`);
    }

    // Write file to upload directory
    for (const file of files) {
        // Check if file is not in fields
        if(!fields.includes(file.fieldname)) {
            (request.body as any)[file.fieldname] = undefined;
            continue;
        }

        // Move file from temporary directory to upload directory
        const filePath = await writeFile(path, file);

        // Add path and signed to request body
        addPathAndSigned(request, file, filePath);
    }
};

// Create function to write file to upload directory
const writeFile = async (directory: string, file: SavedMultipartFile) => {
    // Create path
    const filePath = `${directory}/${Date.now()}-${file.filename}`;

    // Write file to upload directory
    fs.writeFileSync(filePath, await file.toBuffer());

    // Return file path
    return filePath;
}

// Create function to add path and signed to request body
const addPathAndSigned = (request: FastifyRequest, file: SavedMultipartFile, filePath: string) => {
    // Check if request body is null
    request.body = request.body ?? {};

    // Create details object
    const details = (request.body as Record<string, any>)[file.fieldname];
    const fieldname = file.fieldname;

    if (Array.isArray(details)) {
        // Find the index of the file
        const index = details.findIndex((detail: any) => detail.filename === file.filename && !detail.signed);

        // Check if index is found
        if (index !== -1) {
            const { file, fields, _buf, toBuffer, ...rest } = details[index];
            // Update the details object with new properties
            details[index] = { ...rest, path: filePath, signed: true };
        }

        // Set the details object to request body
        (request.body as any)[fieldname] = details;
    } else if (details && typeof details === 'object' && !details.path) {
        const { file, fields, _buf, toBuffer, ...rest } = details;
        // Update the details object with new properties
        (request.body as any)[fieldname] = { ...rest, path: filePath, signed: true };
    }
}

// Export multipart handler middleware
export default uploadHandlerMiddleware;