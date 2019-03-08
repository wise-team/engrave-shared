import { IArticle } from "../../../../interfaces/IArticle";
import { getLatestArticles } from "../../cache";

async function getFeaturedArticles(blogId: string, skip: number, limit: number): Promise<IArticle[]> {
    
    // TODO get featured

    return await getLatestArticles(blogId, skip, limit);
}

export default getFeaturedArticles;
