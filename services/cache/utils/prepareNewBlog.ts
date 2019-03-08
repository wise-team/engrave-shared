import { IBlog } from "../../../interfaces/IBlog";

function prepareNewBlogToCache(dbBlog: any): IBlog {

    const categories: any = [];

    for(const category of dbBlog.categories) {
        const {abstract, name, slug, blogId} = category;
        categories.push({abstract, name, slug, blogId });
    }

    return {
        uniqueId: dbBlog._id,
        owner: dbBlog.owner,
        url: dbBlog.url,
        domain: dbBlog.domain,
        domain_redirect: dbBlog.domain_redirect,
        title: dbBlog.title,
        slogan: dbBlog.slogan,
        logo_url: dbBlog.logo_url,
        main_image: dbBlog.main_image,

        link_facebook: dbBlog.link_facebook,
        link_twitter: dbBlog.link_twitter,
        link_linkedin: dbBlog.link_linkedin,
        link_instagram: dbBlog.link_instagram,

        opengraph_default_image_url: dbBlog.opengraph_default_image_url,
        opengraph_default_description: dbBlog.opengraph_default_description,
        onesignal_app_id: dbBlog.onesignal_app_id,
        onesignal_api_key: dbBlog.onesignal_api_key,
        onesignal_body_length: dbBlog.onesignal_body_length,
        onesignal_logo_url: dbBlog.onesignal_logo_url,
        analytics_gtag: dbBlog.analytics_gtag,
        webmastertools_id: dbBlog.webmastertools_id,
        
        lang: dbBlog.lang,
        theme: dbBlog.theme,

        premium: dbBlog.premium,
        adopter: dbBlog.adopter,
        categories
    }
}

export default prepareNewBlogToCache;