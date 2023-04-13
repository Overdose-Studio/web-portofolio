// Import dependencies
import bycrypt from "bcrypt";
import { FastifyReply } from "fastify";
import { Schema, ObjectId } from "mongoose";

// Import enums
import { UserRole } from "../enums/user-enum";
import { ErrorAPI, StatusAPI } from "../enums/api-enum";

// Import interfaces
import IUser from "../documents/masters/user-document";
import { IDeveloperAccountRequest } from "../../interfaces/payload/developer-payload-interface";

// Import models
import User from "../models/masters/user-model";

// Create interface for developer account plugin
export interface IDeveloperAccountPlugin {
    // Properties
    user: ObjectId;

    // Methods
    getAccount(reply: FastifyReply): Promise<IUser>;
    registerAccount(reply: FastifyReply, data: IDeveloperAccountRequest): Promise<IUser>;
    changePassword(reply: FastifyReply, data: IDeveloperAccountRequest): Promise<IUser>;
    changeEmail(reply: FastifyReply, data: IDeveloperAccountRequest): Promise<IUser>;
    deleteAccount(reply: FastifyReply): Promise<IUser>;
}

// Create a developer account plugin
const developerAccountPlugin = (schema: Schema) => {
    // Add field
    schema.add({
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            default: null
        }
    });

    // Add hooks when developer is saved field `name` to update field `name` in user
    schema.pre('save', async function (next) {
        // Check if user is null
        if (!this.user) next();

        // Get user
        const user = await User
            .findById(this.user)
            .where('deleted_at')
            .equals(null);

        // Check user account
        if (user) {
            // Update user
            user.name = this.name;
            await user.save();
        }

        // Continue
        next();
    });

    // Method: Get user account
    schema.methods.getAccount = async function (reply: FastifyReply): Promise<IUser> {
        // Send response when user is null
        if (!this.user) {
            // Send response
            reply.status(404)
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.NOT_FOUND,
                data: {
                    developer: `Developer with ID ${this._id} does not have user account, please register first.`
                }
            }

            throw new Error('Developer does not have user account');
        }

        // Get user
        const user = await User
            .findById(this.user)
            .where('deleted_at')
            .equals(null);

        // Send response when user is null
        if (!user) {
            // Send response
            reply.status(400)
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.NOT_FOUND,
                data: {
                    developer: `Developer with ID ${this._id} does not have user account, please register first.`
                }
            }

            throw new Error('Developer does not have user account');
        }

        // Return user
        return user;
    }

    // Method: Register user account
    schema.methods.registerAccount = async function (reply: FastifyReply, data: IDeveloperAccountRequest): Promise<IUser> {
        // Send response when user is not null
        if (this.user && await User.exists({ _id: this.user, deleted_at: null })) {
            // Send response
            reply.status(400)
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.ALREADY_EXISTS,
                data: {
                    developer: `Developer with ID ${this._id} already has user account, please update user account instead.`
                }
            }

            throw new Error('Developer already has user account');
        }

        // Check if email is already registered
        if (await User.exists({ email: data.email })) {
            // Send response
            reply.status(400)
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.ALREADY_EXISTS,
                data: {
                    email: `Email ${data.email} is already registered, please use another email.`
                }
            }

            throw new Error('Email is already registered');
        }

        // Hash password
        const salt = await bycrypt.genSalt(10);
        const password = await bycrypt.hash(data.password, salt);

        // Create user document
        const userDocument = await User.create({
            name: this.name,
            email: data.email,
            role: UserRole.DEVELOPER,
            password: password
        });

        // Update developer document
        this.user = userDocument._id;

        // Save developer document
        await this.save();

        // Return user document
        return this.getAccount(reply);
    }

    // Method: Change user password
    schema.methods.changePassword = async function (reply: FastifyReply, data: IDeveloperAccountRequest): Promise<IUser> {
        // Get user
        const user = await this.getAccount(reply);

        // Check if password is correct
        if (!(await bycrypt.compare(data.password, user.password))) {
            // Send response
            reply.status(400)
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.VALIDATION,
                data: {
                    password: `Password is incorrect, please try again.`
                }
            }

            throw new Error('Password is incorrect, please try again.');
        }

        // Hash password
        const salt = await bycrypt.genSalt(10);
        const password = await bycrypt.hash(data.new_password, salt);

        // Update user document
        user.password = password;

        // Save user document
        await user.save();

        // Return user document
        return this.getAccount(reply);
    }

    // Method: Change user email
    schema.methods.changeEmail = async function (reply: FastifyReply, data: IDeveloperAccountRequest): Promise<IUser> {
        // Get user
        const user = await this.getAccount(reply);

        // Check if email is already registered
        if (await User.exists({ email: data.email })) {
            // Send response
            reply.status(400)
            reply.error = {
                status: StatusAPI.FAILED,
                type: ErrorAPI.ALREADY_EXISTS,
                data: {
                    email: `Email ${data.email} is already registered, please use another email.`
                }
            }

            throw new Error('Email is already registered, please use another email.');
        }

        // Update user document
        user.email = data.email;

        // Save user document
        await user.save();

        // Return user document
        return this.getAccount(reply);
    }

    // Method: Delete user account
    schema.methods.deleteAccount = async function (reply: FastifyReply): Promise<IUser> {
        // Get user
        const user = await this.getAccount(reply);

        // Delete user document
        await user.softDelete();

        // Return user document
        return user;
    }
};

// Export developer auth plugin
export default developerAccountPlugin;