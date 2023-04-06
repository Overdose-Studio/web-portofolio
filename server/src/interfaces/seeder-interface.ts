// Create interface
interface Seeder {
    label: string;                      // Label: name of seeder (plural)
    seed: () => Promise<void>;          // Seed: function to seed data
}

// Export interface
export default Seeder;