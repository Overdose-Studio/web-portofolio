// Create upload file interface
interface IUploadFiles {
    [key: string]: {
        fieldname: string;
        file: {
            bytesRead: number;
            truncated: boolean;
        }
        filename: string;
        mimetype: string;
        type: string;
    };
}

// Export module
export default IUploadFiles;