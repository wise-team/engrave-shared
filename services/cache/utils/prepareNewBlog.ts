import { IBlog, Blog } from "../../../interfaces/IBlog";

function prepareNewBlogToCache(dbBlog: IBlog): Blog {
    return {
        username: dbBlog.steem_username,
        domain: dbBlog.domain,
        link_facebook: dbBlog.link_facebook,
        link_twitter: dbBlog.link_twitter,
        link_linkedin: dbBlog.link_linkedin,
        link_instagram: dbBlog.link_instagram,
        title: dbBlog.blog_title,
        slogan: dbBlog.blog_slogan,
        logo_url: dbBlog.blog_logo_url,
        main_image: dbBlog.blog_main_image,
        opengraph_default_image_url: dbBlog.opengraph_default_image_url,
        opengraph_default_description: dbBlog.opengraph_default_description,
        onesignal_app_id: dbBlog.onesignal_app_id,
        onesignal_api_key: dbBlog.onesignal_api_key,
        onesignal_body_length: dbBlog.onesignal_body_length,
        onesignal_logo_url: dbBlog.onesignal_logo_url,
        analytics_gtag: dbBlog.analytics_gtag,
        webmastertools_id: dbBlog.webmastertools_id,
        lang: dbBlog.frontpage_language,
        theme: dbBlog.theme,
        show_everything: dbBlog.show_everything,
        categories: dbBlog.categories
    }
}

export default prepareNewBlogToCache;