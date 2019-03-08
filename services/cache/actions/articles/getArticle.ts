import { setArticle, setArticleInvalid } from "../../cache";
import { ArticleNotFound } from "../../../../helpers/errorCodes";
import { getSteemArticle } from "../../../steem/steem";
import getUsernameFromPermlink from './getUsernameFromPermlink';
import engine from "../../store/engine";
import { IArticle } from "../../../../interfaces/IArticle";

async function getArticle(domain: string, permlink: string): Promise<IArticle> {
    try {
        const path = await engine.get(`posts:${domain}:${permlink}`);

        const flattenedArticle = await engine.get(path);

        if (!flattenedArticle) {

            const username = await getUsernameFromPermlink(domain, permlink);
            const steemArticle = await getSteemArticle(username, permlink);

            if (!steemArticle) {
                await setArticleInvalid(domain, permlink);
                throw new ArticleNotFound();
            }

            return await setArticle(domain, permlink, username, steemArticle);

        } else {

            const article = JSON.parse(flattenedArticle);

            if (article.state == 404) {
                throw new ArticleNotFound();
            }

            return article;
        }

    } catch (error) {
        throw new ArticleNotFound();
    }
}

export default getArticle;