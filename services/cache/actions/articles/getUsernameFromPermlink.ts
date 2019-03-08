import engine from "../../store/engine";
import keys from "../../store/keys";

async function getAuthorFromPermlink(blogId: string, permlink: string): Promise<string> {
    
    const key = await engine.get(`${keys.whichUsername}:${blogId}:${permlink}`);

    const [, username, ] = key.split(':');
    
    return username;
    
}

export default getAuthorFromPermlink;