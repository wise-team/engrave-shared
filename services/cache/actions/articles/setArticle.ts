import parseSteemArticle from '../../../article/parseSteemArticle';
import { getBlog } from '../../cache';
import engine from '../../store/engine';

async function setArticle(hostname: string, username: string, permlink: string, steem_article: any) {
    
    const blog = await getBlog(hostname);

    const parsedArticle = await parseSteemArticle(steem_article, blog);
    const timestamp = (new Date(steem_article.created)).getTime();
    
    await engine.set(`article:${username}:${permlink}`, JSON.stringify(parsedArticle));
    await engine.zadd(`created:${username}`, timestamp, `article:${username}:${permlink}`);
    await engine.zadd(`category:${username}:${parsedArticle.category.slug}`, timestamp, `article:${username}:${permlink}`);
    
    return parsedArticle
}

export default setArticle;