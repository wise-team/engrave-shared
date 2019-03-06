const isImageUrl = require('is-image-url');

var Remarkable = require('remarkable');

var md = new Remarkable({
    html: true, 
    breaks: true,
    linkify: true ,
    quotes: '“”‘’'
});

export default async function renderSteemCommentBody(body: string) {
    let rendered = body;
    
    rendered = removeDappsInfo(rendered);
    rendered = transformYoutubeLinks(rendered);
    rendered = md.render(rendered);
    rendered = await rawUrlsToImages(rendered);
    
    return rendered;
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

    const htmlLink = /(?:)<a([^>]+)>(.+?)<\/a>/g;
    const urlRegex = /(<a href=\".*\">)(.*)(<\/a>)/g;

    const links = text.match(htmlLink);
       
    if(links && links.length) {
        for(const link of links) {
            const url = link.split(urlRegex)[2];
            if(isImageUrl(url)) {
                console.log(url);
                text = text.replace(link, `<img src="${url}" alt="">`);
            }
        }
    }
    
    return text;
}

function removeDappsInfo(body: string) {
    let filtered = body;
    
    filtered = removeEngraveInfo(body);
    filtered = removePartikoInfo(filtered);
    
    return filtered;
}

function removeEngraveInfo(body: string) {

    const result = body
        .replace(/(\*\*\*\*\*\*\*\*\*\*\*\n\nArtykuł autorstwa: @)(?:.*)(, dodany za pomocą serwisu )(?:.*)\(https:\/\/(?:.*)\)/g, "")
        
        .replace(/(\n\*\*\*\n\n###\sOriginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "")
        .replace(/(\n\*\*\*\n\s###\sPierwotnie opublikowano na \[)(.*)(\)\.\sBlog na Steem napędzany przez \[)(.*)(\)\.)/g, "")
        .replace(/(\n\*\*\*\n\n###\sOryginally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.)/g, "")
        
        .replace(/(\n\*\*\*\n<center><sup>Originally posted on \[)(.*)(\)\.\sSteem blog powered by \[)(.*)(\)\.<\/sup><\/center>)/g, "")
        .replace(/(\n\*\*\*\n<center><sup>Pierwotnie opublikowano na \[)(.*)(\)\.\sBlog na Steem napędzany przez \[)(.*)(\)\.<\/sup><\/center>)/g, "");

    return result;
}

function removePartikoInfo(body: string) {
    return body
        .replace("Posted using [Partiko Android](https://steemit.com/@partiko-android)", "")
        .replace("Posted using [Partiko iOS](https://steemit.com/@partiko-ios)","");
}

