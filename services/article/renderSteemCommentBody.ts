
var md = require('markdown-it')({ 
    html: true, 
    linkify: true 
});

export default async function renderSteemCommentBody(body: string) {
    const tmp = removeEngraveInfo(body);
    return await rawUrlsToImages(transformYoutubeLinks(md.render(tmp)));
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

    const imagePath = /(https?:\/\/.*\.(?:png|jpg))/g;
    
    const paragraphedImages = text.match(imagePath);
    
    if(paragraphedImages && paragraphedImages.length) {
        for(const linkifiedImage of paragraphedImages) {
            text = text.replace(linkifiedImage, `<img src="${linkifiedImage}" alt="">`);
        }
    }
    
    return text;
}

function removeEngraveInfo(body: string) {

    const result = body
        .replace(/(\*\*\*\*\*\*\*\*\*\*\*\n\nArtykuł autorstwa: @)(?:.*)(, dodany za pomocą serwisu )(?:.*)\(https:\/\/(?:.*)\)/g, "")
        
        .replace(/(\n\*\*\*\n\n###\sOriginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "")
        .replace(/(\n\*\*\*\n\s###\sPierwotnie opublikowano na \[)(.*)(\)\.\sBlog na Steem napędzany przez \[)(.*)(\)\.)/g, "")
        .replace(/(\n\*\*\*\n\n###\sOryginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "")
        
        .replace(/(\n\*\*\*\nOriginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "")
        .replace(/(\n\*\*\*\nPierwotnie opublikowano na \[)(.*)(\)\.\sBlog na Steem napędzany przez \[)(.*)(\)\.)/g, "");

    return result;
}
