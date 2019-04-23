export interface IArticle {
    title: string,
    permlink: string,
    body: string,
    abstract: string,
    created: Date,
    tags: string[];
    thumbnail: string;
    featured_image: string;
    votes_count: number,
    value: number,
    comments: number,
    category: {
        name: string,
        slug: string
    }
}