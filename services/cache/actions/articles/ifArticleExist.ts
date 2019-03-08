import engine from "../../store/engine";

async function ifArticleExist(username: string, permlink: string): Promise<boolean> {
    return (await engine.get(`engrave:${username}:${permlink}`) != null);
}

export default ifArticleExist;