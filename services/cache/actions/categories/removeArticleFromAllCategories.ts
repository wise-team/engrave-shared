
import getArticleCategories from './getArticleCategories';
import getUsernameFromPermlink from '../articles/getUsernameFromPermlink';
import engine from '../../store/engine';
import keys from '../../store/keys';

const removeFromAllCategories = async (blogId: string, permlink: string) => {

    try {
        const username = await getUsernameFromPermlink(blogId, permlink);
        const categories = await getArticleCategories(blogId, permlink);
        const key = `${keys.cachedArticles}:${username}:${permlink}`;

        for (const category of categories) {
            await engine.zrem(`${keys.blogCategoryList}:${blogId}:${category._id}`, key);
        }

        await engine.zrem(`${keys.blogCreatedList}:${blogId}`, `${keys.cachedArticles}:${username}:${permlink}`);

    } catch (error) {
        console.log(error);
    }
}

export default removeFromAllCategories;