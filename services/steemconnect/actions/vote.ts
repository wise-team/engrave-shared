import sc from '../steemconnect.service';

export default async (access_token: string, voter: string, author: string, permlink: string, weight: number) => {
    sc.blog.setAccessToken(access_token);
    return await sc.blog.vote(voter, author, permlink, weight);
}