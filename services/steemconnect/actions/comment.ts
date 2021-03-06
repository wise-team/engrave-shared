import sc from '../steemconnect.service';
import { handleSteemconnectError } from '../../../hof/handleSteemconnectError';
const steem = require('steem');

export default async (access_token: string, author: string, title: string, body: string, parentAuthor: string, parentPermlink: string) => {
    
    return await handleSteemconnectError( async () => {

        const commentPermlink = steem.formatter.commentPermlink(parentAuthor, parentPermlink);
        const json_metadata = { app: 'engrave' };
        sc.blog.setAccessToken(access_token);
        return await sc.blog.comment(parentAuthor, parentPermlink, author, commentPermlink, "RE: " + title, body, json_metadata, );
        
    });
}