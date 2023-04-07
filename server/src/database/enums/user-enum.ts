// Create enum for user action 
export enum UserAction {
    LOGIN = 'login',            // means that the user logged in system
    CREATE = 'create',          // means that the user create data to database
    UPDATE = 'update',          // means that the user updated data to database
    DELETE = 'delete',          // means that the user deleted data to database
}

// Create enum for user role
export enum UserRole {
    ADMIN = "admin",            //     Admin: Can do everything
    CUSTOMER = "customer",      //  Customer: Coming soon
    DEVELOPER = "developer"     // Developer: Can do project related data
}