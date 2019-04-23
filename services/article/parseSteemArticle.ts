import { IArticle } from '../../interfaces/IArticle';
import { Blog } from '../../interfaces/IBlog';
import renderSteemCommentBody from './renderSteemCommentBody';

var striptags = require('striptags');

export default async (steemArticle: any, blog: Blog): Promise<IArticle> => {

    const {
        title,
        permlink,
        created
    } = steemArticle;

    const body = await renderSteemCommentBody(steemArticle.body);
    const thumbnail = prepareArticleThumbnail(steemArticle);
    const featured_image = prepareArticleFeaturedImage(steemArticle);
    const tags = prepareArticleTags(steemArticle);
    const value = prepareArticleValue(steemArticle);
    const category = prepareArticleCategory(steemArticle, blog);

    return {
        title,
        permlink,
        created,
        thumbnail,
        featured_image,
        body,
        tags,
        votes_count: steemArticle.net_votes,
        value,
        abstract: striptags(body.substr(0, 250)),
        category: category,
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

function prepareArticleFeaturedImage(steemArticle: any) {
    try {
        const metadata = JSON.parse(steemArticle.json_metadata);
        
        if (typeof(metadata.featured_image) == 'undefined' ) { // old version without featured_image -> return thumbnail
            return prepareArticleThumbnail(steemArticle);
        } else {
            return metadata.featured_image
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

function prepareArticleCategory(steemArticle: any, blog: Blog) {    
    try {
        
        for(const category of blog.categories) {
            if(steemArticle.category == category.steem_tag) {
                return {
                    steem_tag: category.steem_tag,
                    name: category.name,
                    slug: category.slug,
                }
            }
        } 
        
        throw new Error();
        
    } catch (error) {
        return {
            steem_tag: steemArticle.category,
            name: steemArticle.category,
            slug: steemArticle.category,
        }  
    }
}
