const secrets = require('@cloudreach/docker-secrets');
import axios from 'axios';
import sc from '../steemconnect.service';

export default async (refresh_token: string) => {
    
    const client_secret = secrets.SC2_APP_SECRET;

    const options = {
        method: 'POST',
        json: true,
        data: {
            refresh_token: refresh_token,
            client_id: process.env.STEEMCONNECT_ID,
            client_secret: client_secret,
            scope: sc.dashboard.scope
        },
        url: "https://steemconnect.com/api/oauth2/token"
    };

    return await axios(options);
}