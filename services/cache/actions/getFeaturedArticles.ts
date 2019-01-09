import { IArticle } from "../../../interfaces/IArticle";
import { getLatestArticles } from "../cache";

async function getFeaturedArticles(username: string, limit: number): Promise<IArticle[]> {
    
    // TODO get featured

    return await getLatestArticles(username, limit);
}

export default getFeaturedArticles;
