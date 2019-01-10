import { IArticle } from "../../../interfaces/IArticle";

const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function getLatestFromCategory(slug: string, username: string, skip: number): Promise<IArticle[]> {
    const permlinks = await redis.zrevrange(`category:${username}:${slug}`, skip, skip + 11);
    
    if(!permlinks.length) {
        return [];
    }

    const rawPosts = await redis.mget(permlinks);
    const posts = rawPosts.map((post: any) => JSON.parse(post));
    return posts;
}

export default getLatestFromCategory;