//--------------------------------------------------------
//* Description: Validator Compiler is a function that 
//*              takes a schema and returns a function 
//*              that takes the data to validate.
//--------------------------------------------------------

// Import dependencies
import { AnySchema } from 'joi';

// Import models
import ErrorAPI from "../database/enums/error-api-enum";

// Create validator compiler input type
type ValidatorCompilerInput = {
    schema: AnySchema,
    method: string,
    url: string,
    httpPart?: string
}

// Create validator compiler
const validatorCompiler = ({ schema, method, url, httpPart } : ValidatorCompilerInput) => {
    return (data: any) => {
        // Validate data
        const result  = schema.validate(data)

        // Set error data
        if (result.error) {
            // Find errors details
            console.log("ERROR", result.error.details);
            const errorDetails = result.error.details.map((detail: any) => {
                return { [detail.context.key ?? "body"]: detail.message }
            });

            // Merge error details to one object
            const mergedErrorDetails = errorDetails.reduce((acc: any, cur: any) => {
                return { ...acc, ...cur };
            }, {});

            result.error.code = ErrorAPI.VALIDATION;
            result.error.message = "Validation data failed, please check your request" + (httpPart ? ` ${httpPart}` : "");
            result.error.details = mergedErrorDetails;
        }

        // Return validation result
        return result;
    }
}

// Export module
export default validatorCompiler;