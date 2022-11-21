import { Schema, model } from "mongoose";

/**
 * Mongoose is a library that is used with node.js that makes using MongoDB easier.
 * 
 * A Schema is a model for the format of documents in a certain collection.
 * So, each collection will have its own unique Schema.
 */

// mongo already adds an _id so don't worry about ids
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// mongoose.model(<Collectionname>, <CollectionSchema>)
export const BlogModel = model("Blog", blogSchema);
