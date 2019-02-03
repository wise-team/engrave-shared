import sc from '../steemconnect.service';
import { handleSteemconnectError } from '../../../hof/handleSteemconnectError';

export default async (access_token: string, voter: string, author: string, permlink: string, weight: number) => {
    
    return await handleSteemconnectError( async () => {
        sc.blog.setAccessToken(access_token);
        return await sc.blog.vote(voter, author, permlink, weight);
    });

}