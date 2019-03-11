import { PostStatus } from "../enums/PostStatus";
import { Document } from "mongoose";
import { ICategory } from "./ICategory";

export interface IDraft extends Document {
    blogId: string
    created: Date,
    username: string,
    scheduled: Date,
    title: string,
    body: string,
    categories: ICategory[],
    tags: string[],
    featured_image: string,
    status: PostStatus,
}