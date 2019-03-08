import { Schema, Model, model, Document } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

interface ICategoryModel extends ICategory, Document { };

export let CategorySchema = new Schema({
    name: String,
    slug: String,
    abstract: String,
    blogId: String
});

export let Categories: Model<ICategoryModel> = model<ICategoryModel>('categories', CategorySchema);