// Import dependencies
import bycrypt from "bcrypt";
import faker from "faker/locale/id_ID";

// Import enums
import UserRole from "../enums/user-role-enum";

// Import interfaces
import Seeder from "../../interfaces/seeder-interface";

// Import models
import User from "../models/masters/user-model";

// Create user seeder
const userSeeder: Seeder = {
    label: "Users",
    seed: async () => {
        // Set data
        const password = "password";
        const role = [UserRole.ADMIN, UserRole.DEVELOPER]
        
        // Create user
        for (let i = 0; i < (role.length * 5); i++) {
            // Encrypt password
            const salt = await bycrypt.genSalt(10);
            const hashedPassword = await bycrypt.hash(password, salt);

            // Create name
            const name = {
                first: faker.name.firstName(),
                last: faker.name.lastName(),
            }

            // Create user
            await User.create({
                name: name.first + " " + name.last,
                email: faker.internet.email(name.first, name.last).toLocaleLowerCase(),
                password: hashedPassword,
                role: role[i % role.length],
            });
        }
    }
}

// Export user seeder
export default userSeeder;