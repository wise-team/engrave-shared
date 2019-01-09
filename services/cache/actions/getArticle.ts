import { setArticle, setArticleNotExist } from "../cache";
import { ArticleNotFound } from "../../../helpers/errorCodes";
import { getSteemArticle } from "../../steem/steem";

const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });

async function getArticle(username: string, hostname: string, permlink: string) {
    try {
        const flattenedArticle = await redis.get(`article:${username}:${permlink}`);
        
        if( ! flattenedArticle) {    
            
            const article = await getSteemArticle(username, permlink);

            if(!article) {
                await setArticleNotExist(hostname,permlink);
                throw new ArticleNotFound();
            }
            
            return await setArticle(username, permlink, article);

        } else {

            const article = JSON.parse(flattenedArticle);

            if(article.state == 404) {
                throw new ArticleNotFound();
            } 

            return article;
        }
        
    } catch (error) {
        throw new ArticleNotFound();
    }
}

export default getArticle;