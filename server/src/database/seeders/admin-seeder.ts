// Import dependencies
import bycrypt from "bcrypt";

// Import enums
import { UserRole } from "../enums/user-enum";

// Import interfaces
import { Seeder } from "../../interfaces/database/config-database-interface";

// Import models
import User from "../models/masters/user-model";

// Create user seeder
const userSeeder: Seeder = {
    label: "Users",
    seed: async () => {
        // Set data
        const password = "secretPower123";
        
        // Encrypt password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // Create user
        await User.create({
            name: "Admin Overdose Studio",
            email: "admin@overdose.co.id",
            password: hashedPassword,
            role: UserRole.ADMIN,
        });
    }
}

// Export user seeder
export default userSeeder;