import engine from "../../store/engine";

async function setArticleExist(username: string, permlink: string, domain: string) {
    return await engine.set(`engrave:${username}:${permlink}`, domain);
}

export default setArticleExist;