import { Types } from "mongoose";

export interface IArticle {
    title: string,
    permlink: string,
    body: string,
    abstract: string,
    created: Date,
    tags: string[];
    featured: string;
    votes_count: number,
    value: number,
    comments: number,
    categories: [
        {
            _id: Types.ObjectId,
            name: string,
            slug: string,
            abstract: string
        }
    ]
}