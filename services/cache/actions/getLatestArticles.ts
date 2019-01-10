import { IArticle } from "../../../interfaces/IArticle";

const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function getLatestArticles(username: string, limit: number): Promise<IArticle[]> {
    const permlinks = await redis.zrevrange(`created:${username}`, 0, limit);
    
    if(!permlinks.length) {
        return [];
    }

    const rawPosts = await redis.mget(permlinks);
    const posts = rawPosts.map((post: any) => JSON.parse(post));
    return posts;
}

export default getLatestArticles;