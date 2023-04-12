// Create enum for error api model
export enum ErrorAPI {
    AUTHENTICATION = 'ERR_AUTHENTICATION',      // means that the request was not authenticated (e.g. missing or invalid token)
    AUTHORIZATION = 'ERR_AUTHORIZATION',        // means that the request was not authorized (e.g. role not allowed)
    MAXIMUM_REACHED = 'ERR_MAXIMUM_REACHED',    // means that the request was not successful (e.g. maximum reached)
    NOT_FOUND = 'ERR_NOT_FOUND',                // means that the request was not found (e.g. data not found)
    PAGINATION = 'ERR_PAGINATION',              // means that the request was erroneous (e.g. pagination error)
    UPLOAD = 'ERR_UPLOAD',                      // means that the request was erroneous (e.g. upload error)
    USER_LOG = 'ERR_USER_LOG',                  // means that the request was not logged (e.g. missing user)
    VALIDATION = 'ERR_VALIDATION',              // means that the request was erroneous (e.g. validation error)
}

// Create enum for status api model
export enum StatusAPI {
    SUCCESS = 'success',        // means that the request was successful
    FAILED = 'failed',          // means that the request was not successful (e.g. validation error)
    ERROR = 'error',            // means that the request was erroneous (e.g. server error)
}