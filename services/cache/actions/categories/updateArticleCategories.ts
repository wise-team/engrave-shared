import engine from "../../store/engine";
import getArticleCategories from "./getArticleCategories";

/** Update all lists with selected permlink on domain name. Need to pass article timestamp as well */
export default async (domain: string, permlink: string, username: string, timestamp: number, categories: string[]) => {
    try {
        await removeFromAllCategories(domain, permlink, username);
        await addToAllCategories(domain, permlink, username, timestamp, categories);
        await setArticleCategories(domain, permlink, categories);
    } catch (error) {
        console.log(error);
    }
}

const removeFromAllCategories = async (domain: string, permlink: string, username: string) => {

    try {

        const categories = await getArticleCategories(domain, permlink);
        const key = `article:${username}:${permlink}`;

        for (const category of categories) {
            await engine.zrem(`category:${domain}:${category}`, key);
        }

    } catch (error) {
        console.log(error);
    }
}


const addToAllCategories = async (domain: string, permlink: string, username: string, timestamp: number, categories: string[]) => {
    try {

        const key = `article:${username}:${permlink}`;

        for (const category of categories) {
            await engine.zadd(`category:${domain}:${category}`, timestamp, key);
        }

        await engine.zadd(`created:${domain}`, timestamp, key);


    } catch (error) {

    }
}

const setArticleCategories = async (domain: string, permlink: string, categories: string[]) => {

    try {
        const stringified = JSON.stringify(categories);
        return await engine.set(`categories:${domain}:${permlink}`, stringified);

    } catch (error) {
        console.log(error);
        
    }
}