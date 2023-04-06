// Create enum for status api model
enum StatusAPI {
    SUCCESS = 'success',        // means that the request was successful
    FAILED = 'failed',          // means that the request was not successful (e.g. validation error)
    ERROR = 'error',            // means that the request was erroneous (e.g. server error)
}

// Export module
export default StatusAPI;