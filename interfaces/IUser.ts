import { Document } from 'mongoose'; 

export interface IUser extends Document {
    username: string,
    adopter: boolean,
    email: String,
    created: Date,
}