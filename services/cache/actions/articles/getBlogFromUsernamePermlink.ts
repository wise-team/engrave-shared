import engine from "../../store/engine";
import keys from "../../store/keys";

async function getBlogFromUsernamePermlink(username: string, permlink: string): Promise<string> {
    
    const blogId = await engine.get(`${keys.whichBlogId}:${username}:${permlink}`);
    
    return blogId;
    
}

export default getBlogFromUsernamePermlink;