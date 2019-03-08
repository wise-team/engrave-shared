import { Schema, Model, model } from 'mongoose';
import { IPost } from '../interfaces/IPost';

export let PostSchema: Schema = new Schema({
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
    categories: [
        {
            name: String,
            slug: String,
            abstract: String,
            blogId: String
        }
    ],
    tags: [String],
    featured_image: String,
    status: { 
        type: String
    }
});

export const Posts: Model<IPost> = model<IPost>("posts", PostSchema);