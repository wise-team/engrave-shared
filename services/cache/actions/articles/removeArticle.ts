import engine from "../../store/engine";
import getUsernameFromPermlink from '../articles/getUsernameFromPermlink';
import removeFromAllCategories from "../categories/removeArticleFromAllCategories";
import keys from "../../store/keys";

async function removeArticle(blogId: string, permlink: string) {
    try {
        const username = await getUsernameFromPermlink(blogId, permlink);
        const cachedArticle = await engine.get(`${keys.cachedArticles}:${username}:${permlink}`);
        const article = JSON.parse(cachedArticle);
        
        if(article) {
            await removeFromAllCategories(blogId, permlink);
        }
        
        

        await engine.del(`${keys.whichUsername}:${blogId}:${permlink}`);
        await engine.del(`${keys.articleExist}:${username}:${permlink}`);
        await engine.del(`${keys.cachedArticles}:${username}:${permlink}`);

    } catch (error) {
        console.log(error);
    }
}

export default removeArticle;