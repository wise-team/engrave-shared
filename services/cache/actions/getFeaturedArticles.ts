import { IArticle } from "../../../interfaces/IArticle";
import { getLatestArticles } from "../cache";

async function getFeaturedArticles(username: string, skip: number): Promise<IArticle[]> {
    
    // TODO get featured

    return await getLatestArticles(username, skip);
}

export default getFeaturedArticles;
