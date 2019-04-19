import { DefaultRenderer } from "steem-content-renderer";

const renderer = new DefaultRenderer({
    baseUrl: "https://steemit.com/",
    breaks: true,
    skipSanitization: false,
    addNofollowToLinks: true,
    doNotShowImages: false,
    ipfsPrefix: "",
    assetsWidth: 640,
    assetsHeight: 480,
    imageProxyFn: (url: string) => url,
    usertagUrlFn: (account: string) => "https://steemit.com/@" + account,
    hashtagUrlFn: (hashtag: string) => "https://steemit.com/trending/" + hashtag,
    isLinkSafeFn: (url: string) => true,
});

export default async function renderSteemCommentBody(body: string) {
    let rendered = body;
    
    rendered = removeDappsInfo(rendered);
    rendered = `<html>${renderer.render(rendered)}</html>`;
    
    return rendered
}

function removeDappsInfo(body: string) {
    let filtered = body;
    
    filtered = removeEngraveInfo(filtered);
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
        .replace("Posted using [Partiko iOS](https://steemit.com/@partiko-ios)","")
        .replace(/Posted using \[Partiko Android\]\(https:\/\/partiko.app\/referral\/.*\)/, "")
        .replace(/Posted using \[Partiko iOS\]\(https:\/\/partiko.app\/referral\/.*\)/, "");
}