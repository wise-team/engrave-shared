import engine from "../../store/engine";
import { ICategory } from "../../../../interfaces/ICategory";
import keys from "../../store/keys";

/** Get the list of categories IDs for selected permlink on given domain name */
export default async (blogId: string, permlink: string): Promise<ICategory[]> => {
    try {
        const rawArray = await engine.get(`${keys.articleWhichCategories}:${blogId}:${permlink}`);
        return JSON.parse(rawArray);
    } catch (error) {
        return [];
    }
}