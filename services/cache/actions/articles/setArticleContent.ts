import parseSteemArticle from '../../../article/parseSteemArticle';
import engine from '../../store/engine';
import { IArticle } from '../../../../interfaces/IArticle';

async function setArticleContent(username: string, permlink: string, steem_article: any): Promise<IArticle> {
    
    const parsedArticle = await parseSteemArticle(steem_article);
    
    await engine.set(`article:${username}:${permlink}`, JSON.stringify(parsedArticle));

    return parsedArticle;
}

export default setArticleContent;