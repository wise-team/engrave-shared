import engine from "../../store/engine";
import keys from "../../store/keys";

async function ifArticleExist(username: string, permlink: string): Promise<boolean> {
    return (await engine.get(`${keys.articleExist}:${username}:${permlink}`) != null);
}

export default ifArticleExist;