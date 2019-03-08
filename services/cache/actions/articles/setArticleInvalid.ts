import engine from "../../store/engine";
import keys from "../../store/keys";

async function setArticleInvalid(username: string, permlink: string) {
    return await engine.set(`${keys.cachedArticles}:${username}:${permlink}`, JSON.stringify({state: 404}), 'EX', 3600 * 24);
}

export default setArticleInvalid;