const steem = require('steem');

async function getSteemArticle (username: string, permlink: string) {
    try {
        const article = await steem.api.getContentAsync(username, permlink);
        
        if(article.author == '') throw new Error("Article not valid");
        
        return article;
    } catch (error) {
        return null;
    }
}

export default getSteemArticle;