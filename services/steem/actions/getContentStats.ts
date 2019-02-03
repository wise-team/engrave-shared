const steem = require('steem');

async function getContentStats (username: string, permlink: string) {
    try {

        const article = await steem.api.getContentAsync(username, permlink);
        
        return {
            net_votes: article.net_votes,
            value: prepareValue(article)
        };
        
    } catch (error) {
        
        return {
            net_votes: 0,
            value: 0
        };
        
    }
}

function prepareValue(article: any) {
    const pendingPayout = parseFloat(article.pending_payout_value.replace(" SBD", ""));
    const curatorPayout = parseFloat(article.curator_payout_value.replace(" SBD", ""));
    const totalPauout = parseFloat(article.total_payout_value.replace(" SBD", ""));
    
    return pendingPayout + curatorPayout + totalPauout;
}

export default getContentStats;