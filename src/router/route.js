const router = express.router();
const express =require ("express")
const authorController = require("../controller/authorController")
const bloggerController = require("../controller/bloggerController")
//create author api
router.post("/authors" , authorController.createAuthor);
//create blog
router.post("/blog",bloggerController.createBlog)
//get blogs 
// router.get("/authors",bloggerController.getBlogs)

module.exports = router;
