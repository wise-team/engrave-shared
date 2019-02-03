import engine from '../../store/engine';

async function setUserRegistered(username: string) {
    
    return await engine.set(`users:${username}`, true);
    
}

export default setUserRegistered;