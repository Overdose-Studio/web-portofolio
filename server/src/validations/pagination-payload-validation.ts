// Import dependencies
import Joi from "joi";

// Create pagination query schema
export const paginationQuerySchema = {
    querystring: Joi.object({
        page: Joi
            .number()
            .integer()
            .min(1)
            .default(1)
            .messages({
                'number.base': 'Page is invalid, please enter a valid page number',
                'number.integer': 'Page is invalid, please enter a valid page number',
                'number.min': 'Page is invalid, please enter a page number greater than 0',
            }),
        limit: Joi
            .number()
            .integer()
            .min(0)
            .max(100)
            .default(10)
            .messages({
                'number.base': 'Limit is invalid, please enter a valid limit number',
                'number.integer': 'Limit is invalid, please enter a valid limit number',
                'number.min': 'Limit is invalid, please enter a limit number greater than 0',
                'number.max': 'Limit is invalid, please enter a limit number less than 100',
            }),
        sort: Joi
            .string()
            .trim()
            .lowercase()
            .default('created_at')
            .messages({
                'string.empty': 'Sort is empty, please enter a sort',
            }),
        order: Joi
            .string()
            .trim()
            .lowercase()
            .valid('asc', 'desc', 'ascending', 'descending', '1', '-1')
            .default('asc')
            .messages({
                'string.empty': 'Order is empty, please enter an order',
                'any.only': 'Order is invalid, please enter a valid order (ASC or DESC)',
            }),
        search: Joi
            .array()
            .items(Joi.object({
                field: Joi
                    .string()
                    .trim()
                    .lowercase()
                    .required()
                    .messages({
                        'string.empty': 'Search field is empty, please enter a search field',
                        'any.required': 'Search field is required, please enter a search field',
                    }),
                value: Joi
                    .string()
                    .trim()
                    .lowercase()
                    .required()
                    .messages({
                        'string.empty': 'Search value is empty, please enter a search value',
                        'any.required': 'Search value is required, please enter a search value',
                    })
            }))
            .default([])
            .messages({
                'array.base': 'Search is invalid, please enter a valid search array',
            }),
        select: Joi
            .array()
            .items(Joi.string().trim().lowercase())
            .default([])
            .messages({
                'array.base': 'Select is invalid, please enter a valid select array',
            }),
    })
    .messages({
        'object.base': 'Invalid request query, please check your request query',
        // 'object.unknown': 'Field is not allowed, remove this field from your request query',
    })
    .options({ abortEarly: false, allowUnknown: true })
}