import engine from "../../store/engine";

/** Get the list of categories IDs for selected permlink on given domain name */
export default async (domain: string, permlink: string): Promise<string[]> => {
    try {
        const rawArray = await engine.get(`categories:${domain}:${permlink}`);
        return JSON.parse(rawArray);
    } catch (error) {
        return [];
    }
}