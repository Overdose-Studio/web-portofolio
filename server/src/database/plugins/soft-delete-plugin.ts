// Import dependencies
import { Schema } from "mongoose";

// Create a soft delete plugin
const softDeletePlugin = (schema: Schema) => {
    // Add deleted_at field
    schema.add({
        deleted_at: {
            type: Date,
            default: null,
        }
    });

    // Add the soft delete method
    schema.method("softDelete", function() {
        this.deleted_at = new Date();
        return this.save();
    });

    // Add the restore method
    schema.method("restore", function() {
        this.deleted_at = null;
        return this.save();
    });

    // Add the delete method
    schema.method("delete", function() {
        return this.remove();
    });
};

// Export soft delete plugin
export default softDeletePlugin;