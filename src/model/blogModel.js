const mongoose = require('mongoose');
const moment = require("moment")
const ObjectId = mongoose.Schema.Types.ObjectId
const date = moment().format("yyyy-mm-dd h:mm:ss")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true,
    },

    authorId: {
        type: ObjectId,
        required: true,
        ref: "AuthorBlogger"
    },
    

    tags: [String],


    category: {
        type: [String],
        required: true
    },
    //  examples: [technology, entertainment, life style, food, fashion]}, 
    subcategory: {
        type:
            [String]
    },
    //  examples[technology-[web development, mobile development, AI, ML etc]] },
    //  createdAt, updatedAt, deletedAt: {when the document is deleted},

    isDeleted: {
              // deletedAt:moment().format("DD-MM-YYYY" ),
        deletedAt: Date.now(),
        type: Boolean,
        default: false
    },

    isPublished: {
        //date:moment().format("yyyy-mm-dd h:mm:ss"),
        //publishedAt:moment().format("DD-MM-YYYY"),
        type: Boolean,
        default: false
    },
},
    { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)