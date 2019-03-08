import engine from "../../store/engine";
import keys from '../../store/keys';

async function setArticleExist(blogId: string, username: string, permlink: string) {
    await engine.set(`${keys.whichUsername}:${blogId}:${permlink}`, `${keys.cachedArticles}:${username}:${permlink}`);
    await engine.set(`${keys.whichBlogId}:${username}:${permlink}`, blogId);
    await engine.set(`${keys.articleExist}:${username}:${permlink}`, true);
}

export default setArticleExist;