import { Schema, Model, model, Document } from 'mongoose';
import { IPost } from '../interfaces/IPost';

interface IPostModel extends IPost, Document { };

export let PostSchema: Schema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'newblogs',
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
    thumbnail: String,
    status: { 
        type: String
    }
});

export const Posts: Model<IPostModel> = model<IPostModel>("posts", PostSchema);