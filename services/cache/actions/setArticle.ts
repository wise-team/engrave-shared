import parseSteemArticle from '../../article/parseSteemArticle';
import { getBlog } from '../cache';

const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function setArticle(hostname: string, username: string, permlink: string, steem_article: any) {
    
    const blog = await getBlog(hostname);

    const parsedArticle = await parseSteemArticle(steem_article, blog);
    const timestamp = (new Date(steem_article.created)).getTime();
    
    await redis.set(`article:${username}:${permlink}`, JSON.stringify(parsedArticle));
    await redis.zadd(`created:${username}`, timestamp, `article:${username}:${permlink}`);
    await redis.zadd(`category:${username}:${parsedArticle.category.slug}`, timestamp, `article:${username}:${permlink}`);
    
    return parsedArticle
}

export default setArticle;