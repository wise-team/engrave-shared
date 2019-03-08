import { Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

export let UserSchema = new Schema({
    username: String,
    adopter: {
        type: Boolean,
        default: false
    },
    email: String,
    created: Date,
});

export let Users: Model<IUser> = model<IUser>('users', UserSchema);