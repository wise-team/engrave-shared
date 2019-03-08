import engine from "../../store/engine";

async function getAuthorFromPermlink(domain: string, permlink: string): Promise<string> {
    
    const key = await engine.get(`posts:${domain}:${permlink}`);

    const [, username, ] = key.split(':');
    
    return username;
    
}

export default getAuthorFromPermlink;