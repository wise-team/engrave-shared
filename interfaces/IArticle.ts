import { ICategory } from "./ICategory";
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
    categories: ICategory[]
}