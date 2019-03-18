import { Document } from "mongoose";

export interface IPublished extends Document{
    date: Date,
    title: string,
    abstract: string,
    image: string,
    username: string,
    steemit_permlink: string,
    engrave_permlink: string,
    content_category: string,
    hidden: boolean
}