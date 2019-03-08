import engine from "../../store/engine";

async function setArticleInvalid(username: string, permlink: string) {
    return await engine.set(`article:${username}:${permlink}`, JSON.stringify({state: 404}), 'EX', 3600 * 24);
}

export default setArticleInvalid;