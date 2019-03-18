import { Schema, Model, model } from 'mongoose';
import { IPublished } from '../interfaces/IPublished';

export let PublishedSchema: Schema = new Schema({
    date: Date,
    title: String,
    abstract: String,
    image: String,
    username: String,
    steemit_permlink: String,
    engrave_permlink: String,
    content_category: String,
    hidden: {
        type: Boolean,
        default: false
    }
});

export const PublishedArticles: Model<IPublished> = model<IPublished>("published", PublishedSchema);