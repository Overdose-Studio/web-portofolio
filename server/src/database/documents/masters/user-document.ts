// Import dependencies
import { Document } from "mongoose";

// Create a user document
interface IUser extends Document {
    name: string;
    email: string;
    role: string;
    password: string;
}

// Export user document
export default IUser;