//------------------------------------------------------------
//* Description: This file contains the error handler middleware
//*              that is used to handle errors in the app
//*              and return a JSON response
//------------------------------------------------------------

// Import dependencies
import dotenv from 'dotenv';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';

// Import interfaces
import { ICustomError } from '../interfaces/custom-error-interface';

// Import models
import { StatusAPI } from '../database/enums/api-enum';

// Import modules
import app from '../app';

// Import utils
import { bytesToText } from '../utils/string-helper';

// Load environment variables
dotenv.config();

// Get environment variables
const production = process.env.NODE_ENV === 'production';
const sizeLimit = parseInt(process.env.MULTIPART_FILE_SIZE_LIMIT ?? '1000000');

// Create error handler middleware
const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    // Log error
    app.log.error(error);

    // Get data from request object and error 
    const { status, data, meta, links, included, type } = reply.error;
    const { statusCode, code, message, stack, details } = error

    // Create additional error data
    const customError: ICustomError = {};
    
    // Set response status code
    const htmlStatus = statusCode ?? reply.statusCode ?? 500;
    reply.status(htmlStatus !== 200 ? htmlStatus : 500);
    
    // Set response for file upload too large
    if (code === 'FST_REQ_FILE_TOO_LARGE') {
        Object.assign(customError, handleRequestFileTooLarge(error));
    }
    
    // Set response body
    reply.json({
        status: status ? status : StatusAPI.ERROR,
        status_code: htmlStatus !== 200 ? htmlStatus : 500,
        code: type ?? code,
        message: customError.message ?? message,
        data: customError.data ?? data ?? details,
        meta: meta,
        links: links,
        included: included,
        stack: production ? undefined : stack
    });
};

// Create function to handle request file too large error
const handleRequestFileTooLarge = (error: FastifyError): ICustomError => {
    // Get data from error
    const { part } = error;

    // Create custom error
    const customError: ICustomError = {};

    // Create custom error message
    customError.message = `Upload failed, file exceeds the size limit of ${bytesToText(sizeLimit)}`;

    // Create custom error data
    customError.data = {};
    Object.keys(part.fields).forEach((key) => {
        const field = part.fields[key];
        if (field.file.truncated) {
            customError.data[field.fieldname] = `File ${field.filename} exceeds the ${bytesToText(sizeLimit)} limit`;
        }
    });

    // Return custom error
    return customError;
};

// Export module
export default errorHandler;