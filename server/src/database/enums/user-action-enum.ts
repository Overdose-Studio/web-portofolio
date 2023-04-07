// Create enum for user action 
enum UserAction {
    LOGIN = 'login',            // means that the user logged in system
    CREATE = 'create',          // means that the user create data to database
    UPDATE = 'update',          // means that the user updated data to database
    DELETE = 'delete',          // means that the user deleted data to database
}

// Export module
export default UserAction;