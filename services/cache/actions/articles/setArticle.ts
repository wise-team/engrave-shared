import setArticleContent from './setArticleContent';
import { setArticleExist } from '../../cache';
import updateArticleCategories from '../categories/updateArticleCategories';

async function setArticle(domain: string, permlink: string, username: string, steem_article: any) {

    const timestamp = (new Date(steem_article.created)).getTime();
       
    await setArticleExist(username, permlink, domain);
    await updateArticleCategories(domain, permlink, username, timestamp, []);
    return await setArticleContent(username, permlink, steem_article);

}

export default setArticle;