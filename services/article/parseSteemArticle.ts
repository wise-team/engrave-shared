import { IArticle } from '../../interfaces/IArticle';
import renderSteemCommentBody from './renderSteemCommentBody';
import { IBlog } from '../../interfaces/IBlog';
import { ICategory } from '../../interfaces/ICategory';

var striptags = require('striptags');

export default async (steemArticle: any, categories: ICategory[]): Promise<IArticle> => {

    const {
        title,
        permlink,
        created
    } = steemArticle;

    const body = await renderSteemCommentBody(steemArticle.body);
    const featured = prepareArticleThumbnail(steemArticle);
    const tags = prepareArticleTags(steemArticle);
    const value = prepareArticleValue(steemArticle);

    return {
        title,
        permlink,
        created,
        featured,
        body,
        tags,
        votes_count: steemArticle.net_votes,
        value,
        abstract: striptags(body.substr(0, 250)),
        categories: categories,
        comments: steemArticle.children
    }
}



function prepareArticleThumbnail(steemArticle: any) {
    try {
        const metadata = JSON.parse(steemArticle.json_metadata);
        if (metadata.image && metadata.image[0]) {
            return metadata.image[0];
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

function prepareArticleTags(steemArticle: any) {
    try {
        const metadata = JSON.parse(steemArticle.json_metadata);
        if (metadata.tags) {
            return metadata.tags;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

function prepareArticleValue(steemArticle: any) {
    const pendingPayout = parseFloat(steemArticle.pending_payout_value.replace(" SBD", ""));
    const curatorPayout = parseFloat(steemArticle.curator_payout_value.replace(" SBD", ""));
    const totalPauout = parseFloat(steemArticle.total_payout_value.replace(" SBD", ""));
    
    return pendingPayout + curatorPayout + totalPauout;
}

function prepareArticleCategories(steemArticle: any, blog: IBlog) {    
   
}
