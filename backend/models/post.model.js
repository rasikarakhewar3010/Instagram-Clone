import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: '',
        trim: true, // Removes leading and trailing spaces
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update the `updatedAt` field on document update
postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const Post = mongoose.model('Post', postSchema);
