import parseSteemArticle from '../../article/parseSteemArticle';

const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function setArticle(username: string, permlink: string, steem_article: any) {
    
    const parsedArticle = parseSteemArticle(steem_article);
    const timestamp = (new Date(steem_article.created)).getTime();
    
    await redis.set(`article:${username}:${permlink}`, JSON.stringify(parsedArticle));
    await redis.zadd(`created:${username}`, timestamp, `article:${username}:${permlink}`);
    // await redis.zadd(`category:${steem_article.category}:${username}`, timestamp, `article:${username}:${permlink}`);
    
    return parsedArticle
}

export default setArticle;