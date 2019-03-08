import engine from "../../store/engine";
import keys from "../../store/keys";

async function isUserRegistered(username: string): Promise<boolean> {
    
    return ( await engine.get(`${keys.users}:${username}`) != null);
    
}

export default isUserRegistered;