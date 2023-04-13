// Import dependencies
import faker from "faker/locale/id_ID";

// Import enums
import { DeveloperContactType, DeveloperEducationLevel } from "../../database/enums/developer-enum";

// Import interfaces
import { Seeder } from "../../interfaces/database/config-database-interface";

// Import models
import Developer from "../models/transactions/developer-model";
import DeveloperContact from "../models/masters/developer-contact-model";
import DeveloperEducation from "../models/masters/developer-education-model";
import DeveloperPhoto from "../models/masters/developer-photo-model";

// Create user seeder
const developerSeeder: Seeder = {
    label: "Developers",
    seed: async () => {
        // Create developers
        for (let i = 0; i < 12; i++) {
            // Create name
            const name = {
                first: faker.name.firstName(),
                last: faker.name.lastName(),
            }

            // Create developer basic data
            const developer = await Developer.create({
                name: `${name.first} ${name.last}`,
                age: faker.datatype.number({ min: 18, max: 60 }),
                location: faker.address.city(),
                about: faker.lorem.paragraphs(1)
            });

            // Create developer contact (1-4 random)
            const contacts = [];
            for (let j = 0; j < faker.datatype.number({ min: 1, max: 4 }); j++) {
                // Create contact
                const contact = await DeveloperContact.create({
                    type: faker.random.arrayElement(Object.values(DeveloperContactType)),
                    label: faker.internet.domainName(),
                    url: faker.internet.url()
                });

                // Push contact
                contacts.push(contact._id);
            }
            developer.contacts = contacts;

            // Create developer education (1-4 random)
            const educations = [];
            for (let j = 0; j < faker.datatype.number({ min: 1, max: 4 }); j++) {
                // Create education
                const education = await DeveloperEducation.create({
                    level: faker.random.arrayElement(Object.values(DeveloperEducationLevel)),
                    institution: faker.company.companyName(),
                    major: faker.lorem.words(2),
                    year: {
                        start: faker.datatype.number({ min: 2000, max: 2010 }),
                        end: faker.datatype.number({ min: 2011, max: 2020 })
                    },
                    description: faker.lorem.paragraphs(1)
                });

                // Push education
                educations.push(education._id);
            }
            developer.educations = educations;

            // Create developer photo (avatar or cover)
            const photos = faker.datatype.number({ min: 1, max: 2 });
            const photo = await DeveloperPhoto.create({
                avatar: faker.image.avatar(),
                cover: photos > 1 ? faker.image.imageUrl() : null
            });
            developer.photo = photo._id;

            // Save developer
            await developer.save();
        }
    }
}

// Export user seeder
export default developerSeeder;