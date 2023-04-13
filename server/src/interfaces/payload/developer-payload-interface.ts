// Import interfaces
import { DeveloperType, DeveloperContactType, DeveloperPhotoType, DeveloperEducationLevel } from "../../database/enums/developer-enum";
import { IFileBody } from "../library/upload-library-interface";

// Create developer basic request interface
export interface IDeveloperBasicRequest {
    name: string;
    age: number;
    type: DeveloperType;
    location: string;
    about: string;
}

// Create developer photo request interface
export interface IDeveloperPhotoRequest {
    avatar: IFileBody;
    cover: IFileBody;
}

// Create developer photo delete request interface
export interface IDeveloperPhotoDeleteRequest {
    types: DeveloperPhotoType[];
}

// Create developer education request interface
export interface IDeveloperEducationRequest {
    _id?: string;
    _ids: string[];
    level: DeveloperEducationLevel;
    institution: string;
    major: string;
    year_start: number;
    year_end?: number;
    description: string;
}

// Create developer contact request interface
export interface IDeveloperContactRequest {
    _id?: string;
    _ids: string[];
    type: DeveloperContactType;
    label: string;
    url: string;
}

// Create developer account request interface
export interface IDeveloperAccountRequest {
    email: string;
    password: string;
    new_password: string;
}