// Import dependencies
import { Model, PopulateOptions } from "mongoose";
import { FastifyReply, FastifyRequest } from "fastify";

// Import enums
import { ErrorAPI, StatusAPI } from "../database/enums/api-enum";

// Import interfaces
import { IPaginationQuery } from "../interfaces/payload/pagination-payload-interface";

// Create get paginated data function
export const getPaginatedData = async (
    model: Model<any>,
    reply: FastifyReply,
    request: FastifyRequest,
    additional: {
        select?: string[];
        populate?: PopulateOptions[]
    }
) => {
    // Get pagination query
    const { page, limit, sort, order, search, select } = request.query as IPaginationQuery;

    // Check sort is field in model
    const timestamp = ["created_at", "updated_at", "deleted_at"];
    if (!timestamp.includes(sort) && !Object.keys(model.schema.obj).includes(sort)) {
        // Set response when error occurs
        reply.status(400);
        reply.error = {
            status: StatusAPI.FAILED,
            type: ErrorAPI.PAGINATION,
            data: {
                sort: sort
            }
        };
        throw new Error(`Cannot sort by ${sort}, field does not exist`);
    }

    // Create sensitive data filter and select
    const sensitiveDataFilter = ["password", "deleted_at", "__v"];
    const sensitiveDataSelect = sensitiveDataFilter.map((field) => `-${field}`);

    // Search filter
    const filter = {};
    const errorFilter = [];

    // Add every field to filter
    if (search) {
        // Create search filter
        const searchFilter = [];

        // Create search filter per search field
        for (const query of search) {
            // Check if field is not sensitive data
            if (!sensitiveDataFilter.includes(query.field) && Object.keys(model.schema.obj).includes(query.field) && model.schema.path(query.field).instance === "String") {
                // Create search filter
                searchFilter.push({
                    [query.field]: {
                        $regex: query.value.toString(),
                        $options: "i"
                    }
                });
            } else {
                errorFilter.push(query);
            }
        }

        // Check if error filter is not empty
        if (errorFilter.length > 0) {
            // Create error message for error filter
            const message = errorFilter.map((query) => `${query.field}`).join(", ");

            // Set response when error occurs
            reply.status(400);
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.PAGINATION,
                data: {
                    search: errorFilter
                }
            };
            throw new Error(`Cannot search by ${message}, field does not exist or is not a string`);
        }

        // Create search filter
        if (searchFilter.length > 0) {
            Object.assign(filter, {
                $and: searchFilter
            });
        }
    }

    // Get total documents and total pages
    const totalDocuments = await model.countDocuments({ ...filter, deleted_at: null });
    const totalPages = Math.ceil(totalDocuments / limit);

    // Get paginated data
    const data = await model
        .find({ ...filter, deleted_at: null })
        .select(select)
        .select(additional.select ?? [])
        .select(sensitiveDataSelect)
        .sort({ [sort]: order })
        .skip((page - 1) * limit)
        .limit(limit);

    // Populate data using populate options
    const populate = additional.populate ?? [];
    if (populate.length > 0) {
        // Populate data per populate options
        for (let i = 0; i < populate.length; i++) {
            await model.populate(data, populate[i]);
        }

        // Populate data using populate options (alternative)
        // await model.populate(data, populate);
    }

    // Return paginated data
    return {
        data,
        meta: {
            page,
            limit,
            sort,
            order,
            search,
            select,
            total_documents: totalDocuments,
            total_pages: totalPages,
        }
    };
};