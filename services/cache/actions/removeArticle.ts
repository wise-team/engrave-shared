
const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function removeArticle(username: string, permlink: string) {
    try {
        const cachedArticle = await redis.get(`article:${username}:${permlink}`);
        const article = JSON.parse(cachedArticle);

        await redis.del(`article:${username}:${permlink}`);
        await redis.zrem(`created:${username}`, `article:${username}:${permlink}`);
        await redis.zrem(`category:${username}:${article.category.slug}`, `article:${username}:${permlink}`);
    } catch (error) {
        console.log(error);
    }
}

export default removeArticle;