// Import dependencies
import dotenv from 'dotenv';
import fs from 'fs';
import { SavedMultipartFile } from '@fastify/multipart';
import { FastifyRequest, FastifyReply } from 'fastify';

// Import interfaces
import { IUploadHandler } from '../interfaces/library/upload-library-interface';

// Import models
import { ErrorAPI, StatusAPI } from '../database/enums/api-enum';

// Load environment variables
dotenv.config();

// Get environment variables
const uploadDirectory = process.env.MULTIPART_UPLOAD_DIR ?? 'public';

// Create multipart handler middleware
const uploadHandlerMiddleware = (...params: IUploadHandler[]) => async (request: FastifyRequest, reply: FastifyReply) => {
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

    // Save files to temporary directory
    const files = await request.saveRequestFiles();

    // Check directory is valid using regex (allow recursive directory)
    await validateDirectory(params, reply);

    // Check file field is required
    await validateRequiredFields(params, files, reply);

    // Check max files parameter are valid
    await validateMaxFiles(params, files, reply);

    // Check mime types parameter are valid 
    await validateMimeTypes(params, files, reply);

    // Write file to upload directory
    await writeUploadedFiles(params, files, request);
};

// Create function to validate directory parameter using regex
const validateDirectory = async (params: IUploadHandler[], reply: FastifyReply) => {
    // Create regex to check directory (allow recursive directory)
    const regex = /^[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)*$/;

    // Remove './public' from directory
    params.forEach((param) => {
        param.directory = param.directory?.replace(`./${uploadDirectory}/`, '') ?? param.directory;
    })

    // Check if directory is valid
    const invalidDirectory = params.filter((param: IUploadHandler) => !regex.test(param.directory ?? ''));
    if (invalidDirectory.length > 0) {
        // Create error data
        const errorData = invalidDirectory.map((param: IUploadHandler) => ({
            [param.name]: `Directory "${param.directory}" must be alphanumeric, dash or underscore`
        }))

        // Send error response
        reply.status(500);
        reply.error = {
            status: StatusAPI.ERROR,
            type: ErrorAPI.UPLOAD,
            data: errorData.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        }
        throw new Error('Params invalid, directory must be alphanumeric, dash or underscore');
    }

    // Create directory if not exists
    params.forEach((param) => {
        // Check if directory exists
        const path = `./${uploadDirectory}/${param.directory}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

        // Set directory to param
        param.directory = path;
    });
};

// Create function to validate required fields
const validateRequiredFields = async (params: IUploadHandler[], files: SavedMultipartFile[], reply: FastifyReply) => {
    // Filter params to get only required fields
    const requiredFields = params.filter((param) => param.required);

    // Check required field on files
    const invalidRequiredFiles: { [key: string]: string } = {};
    requiredFields.forEach((param) => {
        if (!files.some((file) => file.fieldname === param.name && file.filename !== '')) {
            invalidRequiredFiles[param.name] = `Field "${param.name}" is required, please upload your file`;
        }
    });

    // Send error response if any required field is not found
    if (Object.keys(invalidRequiredFiles).length > 0) {
        reply.status(400);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.VALIDATION,
            data: invalidRequiredFiles
        }
        throw new Error('Validation failed, required fields are not found');
    }
};

// Create function to validate max files parameter
const validateMaxFiles = async (params: IUploadHandler[], files: SavedMultipartFile[], reply: FastifyReply) => {
    // Check if max files is valid
    const invalidMaxFiles: { [key: string]: string } = {};
    params.forEach((param) => {
        if (param.maxFiles && param.maxFiles < 1 || param.maxFiles === 0) {
            invalidMaxFiles[param.name] = `Max files "${param.maxFiles}" must be greater than or equal to 1`;
        }
    })

    // Send error response if any max files is invalid
    if (Object.keys(invalidMaxFiles).length > 0) {
        reply.status(500);
        reply.error = {
            status: StatusAPI.ERROR,
            type: ErrorAPI.UPLOAD,
            data: invalidMaxFiles
        }
        throw new Error('Params invalid, max files must be greater than or equal to 1');
    }

    // Check files is more than max files
    const filesExceeded: { [key: string]: string } = {};
    params.forEach((field) => {
        // Filter files to get only files with same field name
        const uploadedFiles = files.filter((file: SavedMultipartFile) => file.fieldname === field.name);

        // Check if files is more than max files
        if (field.maxFiles && uploadedFiles.length > field.maxFiles) {
            filesExceeded[field.name] = `Uploaded files is more than max files (${field.maxFiles})`;
        }
    });
    
    // Send error response if any files are exceeded
    if (Object.keys(filesExceeded).length > 0) {
        reply.status(400);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.VALIDATION,
            data: filesExceeded
        }
        throw new Error('Validation failed, uploaded files must be less than or equal to max files');
    }
};

// Create function to validate mime types using regex
const validateMimeTypes = async (params: IUploadHandler[], files: SavedMultipartFile[], reply: FastifyReply) => {
    // Check if mime types is valid
    const invalidMimeTypes: { [key: string]: string } = {};
    params.forEach((param) => {
        // Check if mime types is valid
        const invalid = param.mimeTypes?.filter((mimeType: string) => !mimeType.includes('/'));
        if (invalid && invalid.length > 0) {
            invalidMimeTypes[param.name] = `Mime types "${invalid.join(', ')}" must be in the format of type/subtype`;
        }
    })

    // Send error response if any mime types is invalid
    if (Object.keys(invalidMimeTypes).length > 0) {
        reply.status(500);
        reply.error = {
            status: StatusAPI.ERROR,
            type: ErrorAPI.UPLOAD,
            data: invalidMimeTypes
        }
        throw new Error('Params invalid, mime types must be in the format of type/subtype');
    }

    // Check file mime types
    const invalidFiles: { [key: string]: string } = {};
    files.forEach((file) => {
        // Check if mime types is valid
        const param = params.find((param) => param.name === file.fieldname);
        if (param && param.mimeTypes) {
            // Create regex to check file type
            const regex = new RegExp(`(${param.mimeTypes.join('|').replace('*', '.*')})$`, 'i');

            // Check if file type is valid
            if (!regex.test(file.mimetype)) {
                invalidFiles[file.fieldname] =
                    `File ${file.filename + (file.filename.length > 0 ? ' ' : '')}` +
                    `is not a valid file type, must be (${param.mimeTypes.join(', ')})`;
            }
        }
    })

    // Send error response if any files is invalid
    if (Object.keys(invalidFiles).length > 0) {
        reply.status(400);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.VALIDATION,
            data: invalidFiles
        }
        throw new Error(`Validation failed, uploaded files has invalid file types`);
    }
};

// Create function to write files to upload directory
const writeUploadedFiles = async (params: IUploadHandler[], files: SavedMultipartFile[], request: FastifyRequest) => {
    for (const param of params) {
        // Filter files to get only files with same field name
        const uploadedFiles = files.filter((file: SavedMultipartFile) => file.fieldname === param.name);

        // Write files to upload directory
        const filePaths = await Promise.all(uploadedFiles.map(async (file) => await writeFile(param.directory ?? '', file)));
    
        // Add path and signed to request body
        uploadedFiles.forEach((file, index) => addPathAndSigned(request, file, filePaths[index]));
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
};

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
};

// Export multipart handler middleware
export default uploadHandlerMiddleware;