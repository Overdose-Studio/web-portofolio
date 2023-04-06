// Create enum for error api model
enum ErrorAPI {
    AUTHENTICATION = 'ERR_AUTHENTICATION',      // means that the request was not authenticated (e.g. missing or invalid token)
    AUTHORIZATION = 'ERR_AUTHORIZATION',        // means that the request was not authorized (e.g. role not allowed)
    NOT_FOUND = 'ERR_NOT_FOUND',                // means that the request was not found (e.g. data not found)
    PAGINATION = 'ERR_PAGINATION',              // means that the request was erroneous (e.g. pagination error)
    USER_LOG = 'ERR_USER_LOG',                  // means that the request was not logged (e.g. missing user)
    VALIDATION = 'ERR_VALIDATION',              // means that the request was erroneous (e.g. validation error)
}

// Export module
export default ErrorAPI;