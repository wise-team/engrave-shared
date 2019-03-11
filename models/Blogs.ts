import { Schema, Model, model } from "mongoose";
import { IBlog } from "../interfaces/IBlog";
import { CollaborationType } from "../enums/CollaborationType";

export let BlogSchema = new Schema({
    owner: String,
    collaboration_type: {
        type: String,
        default: CollaborationType.MANY_USERS
    },
    collaborators: [
        {
            username: String,
            role: { type: String }
        }
    ],
    domain: String,
    custom_domain: String,
    domain_redirect: Boolean,
    title: String,
    slogan: String,
    logo_url: String,
    favicon_url: String,
    main_image: String,

    link_facebook: String,
    link_twitter: String,
    link_linkedin: String,
    link_instagram: String,

    opengraph_default_image_url: String,
    opengraph_default_description: String,

    onesignal_app_id: String,
    onesignal_api_key: String,
    onesignal_body_length: Number,
    onesignal_logo_url: String,

    analytics_gtag: String,
    webmastertools_id: String,
    
    theme: {
        type: String,
        default: 'magazine'
    },

    premium: {
        type: Boolean,
        default: false
    },

    categories: [
        {
            name: String,
            slug: String,
            abstract: String,
            blogId: String
        }
    ]
});

export let Blogs: Model<IBlog> = model<IBlog>('blogs', BlogSchema);