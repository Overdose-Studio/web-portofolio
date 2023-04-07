// Import dependencies
import { SortOrder } from "mongoose";

// Create pagination query interface
export interface IPaginationQuery {
    page: number;
    limit: number;
    sort: string;
    order: SortOrder;
    search: {
        field: string;
        value: string;
    }[];
    select: string[];
}