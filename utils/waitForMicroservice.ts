
import axios from 'axios';

export default async (path: string) => {

    console.log(" ** Waiting for:", path);
    while(! await ping(path)); 
    
}

async function ping(path: string) {

    try {
        const options = {
            method: 'GET',
            url: 'http://' + path + '/health/ping'
        };
        
        const response = await axios(options);

        const { data: { message } } = response;

        return message === 'pong';

    } catch (error) {
        return false;
    }
}