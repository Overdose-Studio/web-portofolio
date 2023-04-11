// Import interfaces
import { DeveloperType, DeveloperPhotoType } from "../../database/enums/developer-enum";
import { IFileBody } from "../upload-interface";

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