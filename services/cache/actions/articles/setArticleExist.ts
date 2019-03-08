import engine from "../../store/engine";

async function setArticleExist(username: string, permlink: string, domain: string) {
    return await engine.set(`posts:${domain}:${permlink}`, `article:${username}:${permlink}`);
}

export default setArticleExist;