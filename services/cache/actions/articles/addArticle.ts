import setArticleContent from './setArticleContent';
import { setArticleExist } from '../../cache';
import updateArticleCategories from '../categories/updateArticleCategories';
import { ICategory } from '../../../../interfaces/ICategory';

async function addArticle(blogId: string, permlink: string, steem_article: any, categories: ICategory[]) {

    const timestamp = (new Date(steem_article.created)).getTime();
       
    await setArticleExist(blogId, steem_article.author, permlink);
    await updateArticleCategories(blogId, permlink, timestamp, categories); // TODO pass categories array
    return await setArticleContent(steem_article.author, permlink, steem_article);

}

export default addArticle;