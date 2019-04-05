import { Schema, Model, model } from 'mongoose';
import { IDraft } from '../interfaces/IDraft';

export let DraftSchema: Schema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blogs',
        required: true
    },
    created: Date,
    username: String,
    scheduled: {
        type: Date,
        required: false
    },
    title: String,
    body: String,
    categories: [String],
    tags: [String],
    featured_image: String,
    thumbnail_image: String,
    status: { 
        type: String
    },
    decline_reward: {
        type: Boolean,
        default: false
    },
    permlink: String,
    parent_category: String
});

export const Drafts: Model<IDraft> = model<IDraft>("drafts", DraftSchema);