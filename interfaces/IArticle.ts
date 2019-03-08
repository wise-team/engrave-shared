export interface IArticle {
    title: string,
    permlink: string,
    body: string,
    abstract: string,
    created: Date,
    tags: string[];
    thumbnail: string;
    votes_count: number,
    value: number,
    comments: number,
    category: {
        name: string,
        slug: string
    }
}