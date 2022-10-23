const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },

    body: {
        type: String,
        required: true,
        trim: true
    },

    authorId: {
        type: ObjectId,
        required: true,
        ref: "AuthorBlogger"
    },

    tags: {
        type:[String],
        trim: true
    },

    category: {
        type: [String],
        required: true,
        trim: true
    },
    subcategory:[String],

    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
},
    { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)