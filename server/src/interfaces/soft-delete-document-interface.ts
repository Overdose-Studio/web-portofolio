// Create softDelete document interface
interface SoftDeleteDocument {
    // Properties
    deleted_at: Date;

    // Methods
    softDelete(): Promise<this>;
    restore(): Promise<this>;
    delete(): Promise<this>;
}

// Export softDelete document interface
export default SoftDeleteDocument;