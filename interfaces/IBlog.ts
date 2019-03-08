import { ICategory } from "./ICategory";
import { Document } from "mongoose";
import { ICollaborator } from './ICollaborator';
import { CollaborationType } from "../enums/CollaborationType";


export interface IBlog extends Document {
    owner: string;
    collaboration_type: CollaborationType,
    collaborators: [
        ICollaborator
    ],
    domain: string,
    custom_domain: String,
    domain_redirect: boolean,
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
    
    theme: string;

    premium: boolean;

    categories: ICategory[]
}