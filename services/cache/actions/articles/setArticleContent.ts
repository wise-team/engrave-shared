import parseSteemArticle from '../../../article/parseSteemArticle';
import engine from '../../store/engine';
import { IArticle } from '../../../../interfaces/IArticle';
import getArticleCategories from '../categories/getArticleCategories';
import getBlogFromUsernamePermlink from '../articles/getBlogFromUsernamePermlink';
import keys from '../../store/keys';

async function setArticleContent(username: string, permlink: string, steem_article: any): Promise<IArticle> {
    
    const blogId = await getBlogFromUsernamePermlink(username, permlink);
    const categories = await getArticleCategories(blogId, permlink);
    const parsedArticle = await parseSteemArticle(steem_article, categories);
    
    await engine.set(`${keys.cachedArticles}:${username}:${permlink}`, JSON.stringify(parsedArticle));

    return parsedArticle;
}

export default setArticleContent;