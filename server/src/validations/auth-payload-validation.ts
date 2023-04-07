// Import dependencies
import Joi from "joi";

// Create schema
export const loginSchema = {
    body: Joi.object({
        email: Joi
            .string()
            .trim()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is empty, please enter your email',
                'string.email': 'Email is invalid, please enter a valid email',
                'any.required': 'Email is required, please enter your email'
            }),
        password: Joi
            .string()
            .min(8)
            .max(32)
            .required()
            .messages({
                'string.empty': 'Password is empty, please enter your password',
                'string.min': 'Password must be at least 8 characters',
                'string.max': 'Password must be at most 32 characters',
                'any.required': 'Password is required, please enter your password'
            }),
        remember: Joi
            .boolean()
            .default(false)
            .messages({
                'boolean.base': 'Remember me must be a boolean value'
            })
    })
    .required()
    .messages({
        'object.base': 'Invalid request body, please check your request body',
        'object.unknown': 'Field is not allowed, remove this field from your request body',
    })
    .options({ abortEarly: false })
};