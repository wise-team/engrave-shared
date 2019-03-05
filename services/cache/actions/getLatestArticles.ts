import { IArticle } from "../../../interfaces/IArticle";
import engine from "../store/engine";

async function getLatestArticles(username: string, skip: number, limit?: number): Promise<IArticle[]> {
    const permlinks = await engine.zrevrange(`created:${username}`, skip, limit ? (skip + limit) : (skip + 11));
    
    if(!permlinks.length) {
        return [];
    }

    const rawPosts = await engine.mget(permlinks);
    const posts = rawPosts.map((post: any) => JSON.parse(post));
    return posts;
}

export default getLatestArticles;