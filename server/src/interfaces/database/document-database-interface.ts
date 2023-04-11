// Create softDelete document interface
export interface SoftDeleteDocument {
    // Properties
    deleted_at: Date;

    // Methods
    softDelete(): Promise<this>;
    restore(): Promise<this>;
    delete(): Promise<this>;
}

// Create timestamp document interface
export interface TimestampDocument {
    created_at: Date;
    updated_at: Date;
}