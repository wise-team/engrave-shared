import { ArticleNotFound } from "../../../../helpers/errorCodes";
import engine from "../../store/engine";
import { IArticle } from "../../../../interfaces/IArticle";
import keys from "../../store/keys";

async function getArticle(blogId: string, permlink: string): Promise<IArticle> {
    try {
        const articleByUsername = await engine.get(`${keys.whichUsername}:${blogId}:${permlink}`);

        const cachedArticle = await engine.get(articleByUsername);

        if (!cachedArticle) {
            throw new ArticleNotFound();
        } 
        
        const article = JSON.parse(cachedArticle);

        if (article.state == 404) {
            throw new ArticleNotFound();
        }

        return article;

    } catch (error) {
        throw new ArticleNotFound();
    }
}

export default getArticle;