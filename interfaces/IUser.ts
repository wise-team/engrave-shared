import { Document } from 'mongoose'; 

export interface IUser extends Document {
    username: string,
    adopter: boolean,
    email: string,
    newsletter: boolean,
    created: Date,
    confirmation_token: string,
    confirmed: boolean
}