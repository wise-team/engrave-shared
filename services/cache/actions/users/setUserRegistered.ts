import engine from '../../store/engine';
import keys from '../../store/keys';

async function setUserRegistered(username: string) {
    
    return await engine.set(`${keys.users}:${username}`, true);
    
}

export default setUserRegistered;