import { IArticle } from "../../../../interfaces/IArticle";
import engine from "../../store/engine";
import keys from "../../store/keys";

async function getLatestFromCategory(categoryId: string, blogId: string, skip: number, limit: number): Promise<IArticle[]> {
    const permlinks = await engine.zrevrange(`${keys.blogCategoryList}:${blogId}:${categoryId}`, skip, limit ? (skip + limit) : (skip + 11));
    
    if(!permlinks.length) {
        return [];
    }

    const rawPosts = await engine.mget(permlinks);
    const onlyValid = rawPosts.filter( (post: any) => post != null);
    const posts = onlyValid.map((post: any) => JSON.parse(post));
    return posts;
}

export default getLatestFromCategory;