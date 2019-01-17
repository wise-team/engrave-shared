import { Document } from "mongoose";

export interface INewBlog extends Document {
    username: string;
    domain: string;
    title: string;
    slogan: string;
    logo_url: string;
    main_image: string;

    link_facebook: string;
    link_twitter: string;
    link_linkedin: string;
    link_instagram: string;

    opengraph_default_image_url: string;
    opengraph_default_description: string;
    onesignal_app_id: string;
    onesignal_api_key: string;
    onesignal_body_length: number;
    onesignal_logo_url: string;
    analytics_gtag: string;
    webmastertools_id: string;
    
    lang: string;
    theme: string;
    premium: boolean;
    categories: [{
            steem_tag: string;
            name: string,
            slug: string
    }]
}