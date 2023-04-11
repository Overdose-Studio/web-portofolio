// Import dependencies
import 'fastify';

// Import interfaces
import { IUploadFiles } from '../interfaces/library/upload-library-interface';

// Extend FastifyError interface
declare module 'fastify' {
    interface FastifyError {
        part: {
            encoding: string;
            fieldname: string;
            fields: IUploadFiles;
            filename: string;
            mimetype: string;
            type: string;
        }
    }
}