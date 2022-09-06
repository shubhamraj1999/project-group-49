const express = require('express');
const router = express.Router();

const authorController = require("../controller/authorController")
const bloggerController = require("../controller/bloggerController")

//create author api
router.post("/authors" , authorController.createAuthor);
//create blog
router.post("/blog",bloggerController.createBlog) 
//get blogs 
 router.get("/getBlogs",bloggerController.getBlogs)
 router.put("/blogs/:blogId",bloggerController.updateData)
 router.delete("/blogs/:blogId",bloggerController.deleteblog)
 
module.exports = router;



