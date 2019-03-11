import { Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

export let UserSchema = new Schema({
    username: String,
    adopter: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    newsletter: Boolean,
    created: Date,
    confirmation_token: String,
    confirmed: {
        type: Boolean,
        default: false
    }
});

export let Users: Model<IUser> = model<IUser>('users', UserSchema);