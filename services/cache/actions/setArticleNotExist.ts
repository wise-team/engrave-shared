const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function setArticleNotExist(username: string, permlink: string) {
    return await redis.set(`article:${username}:${permlink}`, JSON.stringify({state: 404}), 'EX', 3600 * 24);
}

export default setArticleNotExist;