const express = require('express');
const router = express.Router();

const authorController = require("../controller/authorController")
const bloggerController = require("../controller/bloggerController")

////////////////////////create author api/////////////////////////////////
router.post("/authors" , authorController.createAuthor);
/////////////////////////create blog/////////////////////////////////////
router.post("/blog",bloggerController.createBlog) 
/////////////////////////get blogs //////////////////////////////////////
 router.get("/getBlogs",bloggerController.getBlogs)
 ////////////////////////update blog/////////////////////////////////////
 router.put("/blogs/:blogId",bloggerController.updateBlog)
 ////////////////////////delete blog////////////////////////////////////
 router.delete("/blogs/:blogId",bloggerController.deleteblog)
 router.delete("/blogs/:blogId",bloggerController.deletebyquery)
 ///////////////////////////////////////////////////////////////////////
module.exports = router;



