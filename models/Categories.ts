import { Schema, Model, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

export let CategorySchema = new Schema({
    name: String,
    slug: String,
    abstract: String,
    blogId: String
});

export let Categories: Model<ICategory> = model<ICategory>('categories', CategorySchema);