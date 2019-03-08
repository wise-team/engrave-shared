import { IArticle } from "../../../../interfaces/IArticle";
import engine from "../../store/engine";

async function getLatestFromCategory(slug: string, username: string, skip: number): Promise<IArticle[]> {
    const permlinks = await engine.zrevrange(`category:${username}:${slug}`, skip, skip + 11);
    
    if(!permlinks.length) {
        return [];
    }

    const rawPosts = await engine.mget(permlinks);
    const onlyValid = rawPosts.filter( (post: any) => post != null);
    const posts = onlyValid.map((post: any) => JSON.parse(post));
    return posts;
}

export default getLatestFromCategory;