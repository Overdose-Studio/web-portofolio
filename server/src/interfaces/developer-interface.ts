// Import interfaces
import { DeveloperType } from "../database/enums/developer-enum";

// Create developer basic request interface
export interface IDeveloperBasicRequest {
    name: string;
    age: number;
    type: DeveloperType;
    location: string;
    about: string;
}