import engine from "../../store/engine";
import removeFromAllCategories from './removeArticleFromAllCategories'
import getUsernameFromPermlink from '../articles/getUsernameFromPermlink';
import { ICategory } from "../../../../interfaces/ICategory";
import keys from "../../store/keys";

/** Update all lists with selected permlink on domain name. Need to pass article timestamp as well */
export default async (blogId: string, permlink: string, timestamp: number, categories: ICategory[]) => {
    try {
        await removeFromAllCategories(blogId, permlink);
        await addToAllCategories(blogId, permlink, timestamp, categories);
        await setArticleCategories(blogId, permlink, categories);
    } catch (error) {
        console.log(error);
    }
}

const addToAllCategories = async (blogId: string, permlink: string, timestamp: number, categories: ICategory[]) => {
    try {

        const username = await getUsernameFromPermlink(blogId, permlink);
        const key = `${keys.cachedArticles}:${username}:${permlink}`;

        for (const category of categories) {
            await engine.zadd(`${keys.blogCategoryList}:${blogId}:${category._id}`, timestamp, key);
        }

        await engine.zadd(`${keys.blogCreatedList}:${blogId}`, timestamp, key);


    } catch (error) {

    }
}

const setArticleCategories = async (blogId: string, permlink: string, categories: ICategory[]) => {
    try {
        const stringified = JSON.stringify(categories);
        return await engine.set(`${keys.articleWhichCategories}:${blogId}:${permlink}`, stringified);

    } catch (error) {
        console.log(error);
        
    }
}