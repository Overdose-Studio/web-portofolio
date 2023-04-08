// Import dependencies
import dotenv from 'dotenv';
import multipart from '@fastify/multipart';
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// Load environment variables
dotenv.config();

// Get environment variables
const multipartENV = {
    addToBody: process.env.MULTIPART_ADD_TO_BODY === 'true',
    headerPairs: parseInt(process.env.MULTIPART_HEADER_PAIRS_LIMIT ?? '2000'),
    fieldNameSize: parseInt(process.env.MULTIPART_FIELD_NAME_SIZE_LIMIT ?? '100'),
    fieldSize: parseInt(process.env.MULTIPART_FIELD_SIZE_LIMIT ?? '1000000'),
    fields: parseInt(process.env.MULTIPART_FIELDS_LIMIT ?? '10'),
    fileSize: parseInt(process.env.MULTIPART_FILE_SIZE_LIMIT ?? '1000000'),
    files: parseInt(process.env.MULTIPART_FILES_LIMIT ?? '1'),
};

// Define a fastify plugin
const multipartParser: FastifyPluginAsync = plugin(async (fastify: FastifyInstance) => {
    // Register the plugin on the fastify instance
    fastify.register(multipart, {                                   // Parse and set multipart data
        addToBody: multipartENV.addToBody,                          //--- Add multipart data to body
        sharedSchemaId: 'multipartFile',                            //--- Set shared schema id
        limits: {                                                   //--- Set limits
            fieldNameSize: multipartENV.fieldNameSize,              //------ Set field name size limit
            fieldSize: multipartENV.fieldSize,                      //------ Set field size limit
            fields: multipartENV.fields,                            //------ Set fields limit
            fileSize: multipartENV.fileSize,                        //------ Set file size limit
            files: multipartENV.files,                              //------ Set files limit
            headerPairs: multipartENV.headerPairs,                  //------ Set header pairs limit
        }
    });
});

// Export the plugin as a module
export default multipartParser;