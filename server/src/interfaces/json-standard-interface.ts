// Import models
import { StatusAPI } from '../database/enums/api-enum';

// Create JSON standard interface
interface JSON_Standard {
    status: StatusAPI;          // Status of the response
    status_code?: number;       // Status code of the response
    message: string;            // Message of the response
    data?: any;                 // Data object (e.g. user object)
    meta?: any;                 // Meta object (e.g. pagination object)
    links?: any;                // Links object (e.g. pagination links)
    included?: any;             // Included object (e.g. user object)
    code?: string;              // Code of the response (e.g. error code)
    stack?: any;                // Stack of the response (e.g. error stack)
}

// Export interface
export default JSON_Standard;