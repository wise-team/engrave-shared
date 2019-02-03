import engine from "../store/engine";

async function removeArticle(username: string, permlink: string) {
    try {
        await engine.del(`article:${username}:${permlink}`);
        await engine.zrem(`created:${username}`, `article:${username}:${permlink}`);
        
        const cachedArticle = await engine.get(`article:${username}:${permlink}`);
        const article = JSON.parse(cachedArticle);
        
        if(article) {
            await engine.zrem(`category:${username}:${article.category.slug}`, `article:${username}:${permlink}`);
        }
        
    } catch (error) {
        console.log(error);
    }
}

export default removeArticle;