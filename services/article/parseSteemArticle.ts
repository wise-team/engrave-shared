import { IArticle } from '../../interfaces/IArticle';
import { Blog } from '../../interfaces/IBlog';

var md = require('markdown-it')({ linkify: true });
var striptags = require('striptags');
var isAnImageUrl = require('is-an-image-url');

export default async (steemArticle: any, blog: Blog): Promise<IArticle> => {

    const {
        title,
        permlink,
        created
    } = steemArticle;

    const body = await prepareArticleBody(steemArticle.body);
    const thumbnail = prepareArticleThumbnail(steemArticle);
    const tags = prepareArticleTags(steemArticle);
    const value = prepareArticleValue(steemArticle);
    const category = prepareArticleCategory(steemArticle, blog);

    return {
        title,
        permlink,
        created,
        thumbnail,
        body,
        tags,
        votes_count: steemArticle.net_votes,
        value,
        abstract: striptags(body.substr(0, 250)),
        category: category,
        comments: steemArticle.children
    }
}

async function prepareArticleBody(body: string) {
    const tmp = removeEngraveInfo(striptags(body));
    return await rawUrlsToImages(transformYoutubeLinks(md.render(tmp)));
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

function createYoutubeEmbed(key: string) {
    return '<iframe width="100%" height="375" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe><br/>';
};

function transformYoutubeLinks(text: string) {
    if (!text) return text;

    const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
    const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

    let resultHtml = text;

    // get all the matches for youtube links using the first regex
    const match = text.match(fullreg);
    if (match && match.length > 0) {
        // get all links and put in placeholders
        const matchlinks = text.match(linkreg);
        if (matchlinks && matchlinks.length > 0) {
            for (var i = 0; i < matchlinks.length; i++) {
                resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#");
            }
        }

        // now go through the matches one by one
        for (var i = 0; i < match.length; i++) {
            // get the key out of the match using the second regex
            let matchParts = match[i].split(regex);
            // replace the full match with the embedded youtube code
            resultHtml = resultHtml.replace(match[i], createYoutubeEmbed(matchParts[1]));
        }

        // ok now put our links back where the placeholders were.
        if (matchlinks && matchlinks.length > 0) {
            for (var i = 0; i < matchlinks.length; i++) {
                resultHtml = resultHtml.replace("#placeholder" + i + "#", matchlinks[i]);
            }
        }
    }
    return resultHtml;
};

async function rawUrlsToImages(text: string): Promise<string> {
    const linkedRegex = /(?:)<p><a([^>]+)>(.+?)<\/a><\/p>/g;
    const paragraphedImages = text.match(linkedRegex);

    if(paragraphedImages && paragraphedImages.length)
    for(const linkifiedImage of paragraphedImages) {
        const [,url] = linkifiedImage.split(/<a href="(.+)"\>.+?<\/a>/g);
        if( await isUrlImageAsync(url)) {
            text = text.replace(linkifiedImage, `<p><img src="${url}" alt=""></p>`);
        }
    }

    return text;
}

function removeEngraveInfo(body: string) {

    const result = body
            .replace(/(\*\*\*\*\*\*\*\*\*\*\*\n\nArtykuł autorstwa: @)(?:.*)(, dodany za pomocą serwisu )(?:.*)\(https:\/\/(?:.*)\)/g, "")
            .replace(/(\n\*\*\*\n\n###\sOriginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "")
            .replace(/(\n\*\*\*\n\s###\sPierwotnie opublikowano na \[)(.*)(\)\.\sBlog na Steem napędzany przez \[)(.*)(\)\.)/g, "")
            .replace(/(\n\*\*\*\n\n###\sOryginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "");
    return result;
}

async function isUrlImageAsync(url: string) {
    return new Promise((resolve, reject) => {
        isAnImageUrl(url, (result: boolean) => {
            resolve(result);
        });
    })
}