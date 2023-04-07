// Import dependencies
import Joi from "joi";

// Create id params schema (must be a valid MongoDB ObjectId)
export const idParamsSchema = {
    params: Joi.object({
        id: Joi
            .string()
            .trim()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.empty': 'Id is empty, please enter your id',
                'string.pattern.base': 'Id is invalid, please enter a valid id',
                'any.required': 'Id is required, please enter your id'
            })
    })
    .required()
    .messages({
        'object.base': 'Invalid request params, please check your request params',
        'object.unknown': 'Field is not allowed, remove this field from your request params',
    })
};