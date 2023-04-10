// Import dependencies
import Joi from "joi";

// Import enums
import { DeveloperType, DeveloperPhotoType } from "../database/enums/developer-enum";

// Create developer basic schema
export const developerBasicSchema = {
    body: Joi.object({
        name: Joi
            .string()
            .min(3)
            .max(32)
            .required()
            .messages({
                'string.empty': 'Name is empty, please enter your name',
                'string.min': 'Name must be at least 3 characters',
                'string.max': 'Name must be at most 32 characters',
                'any.required': 'Name is required, please enter your name',
            }),
        age: Joi
            .number()
            .min(18)
            .max(100)
            .default(null)
            .messages({
                'number.empty': 'Age is empty, please enter your age',
                'number.base': 'Age must be a number',
                'number.min': 'Age must be at least 18 years old',
                'number.max': 'Age must be at most 100 years old',
            }),
        type: Joi
            .string()
            .valid(...Object.values(DeveloperType))
            .default(null)
            .messages({
                'string.empty': 'Type is empty, please enter your type',
                'any.only': 'Type is invalid, please enter a valid type',
            }),
        location: Joi
            .string()
            .min(3)
            .max(32)
            .default(null)
            .messages({
                'string.empty': 'Location is empty, please enter your location',
                'string.min': 'Location must be at least 3 characters',
                'string.max': 'Location must be at most 32 characters',
            }),
        about: Joi
            .string()
            .min(3)
            .max(256)
            .default(null)
            .messages({
                'string.empty': 'About is empty, please enter your about',
                'string.min': 'About must be at least 3 characters',
                'string.max': 'About must be at most 256 characters',
            }),
    })
    .required()
    .messages({
        'object.base': 'Invalid request body, please check your request body',
        'object.unknown': 'Field is not allowed, remove this field from your request body',
    })
    .options({ abortEarly: false })
};

// Create developer photo schema
export const developerPhotoSchema = (field: string) => {
    return {
        body: Joi.object({
            [field]: Joi
                .object()
                .required()
                .messages({
                    'object.base': `${field} is invalid, please upload your ${field} again`,
                    'object.empty': `${field} is empty, please upload your ${field}`,
                    'any.required': `${field} is required, please upload your ${field}`,
                }),
        })
        .required()
        .messages({
            'object.base': 'Invalid request body, please check your request body',
            'object.unknown': 'Field is not allowed, remove this field from your request body',
        })
        .options({ abortEarly: false }),
    };
};

// Create developer photo delete schema
export const developerPhotoDeleteSchema = {
    body: Joi.object({
        types: Joi
            .array()
            .items(Joi
                .string()
                .valid(...Object.values(DeveloperPhotoType))
                .messages({
                    'string.empty': 'Type is empty, please enter your type',
                    'any.only': `Type is invalid, please enter a valid type (${Object.values(DeveloperPhotoType).join(', ')})`,
                })
            )
            .single()
            .required()
            .messages({
                'array.base': 'Type is invalid, please enter a valid type',
                'array.empty': 'Type is empty, please enter your type',
                'any.required': 'Type is required, please enter your type',
            })
    })
    .required()
    .messages({
        'object.base': 'Invalid request body, please check your request body',
        'object.unknown': 'Field is not allowed, remove this field from your request body',
    })
    .options({ abortEarly: false })
}