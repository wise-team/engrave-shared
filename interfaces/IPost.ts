import { PostStatus } from "../enums/PostStatus";

export interface IPost {
    created: Date,
    username: string,
    scheduled: Date,
    title: string,
    body: string,
    categories: string[],
    tags: string[],
    thumbnail: string,
    status: PostStatus
}