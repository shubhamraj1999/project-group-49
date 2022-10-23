const express = require('express');

const router = express.Router();

const authorController = require("../controller/authorController")

const bloggerController = require("../controller/bloggerController")

const auth = require("../middleware/auth")

//===============create author api==============//

router.post("/authors", authorController.createAuthor);

//====================create Token/Login author===========//

router.post("/login",authorController.loginAuthor);

//=====================create blog==================//

router.post("/blogs", auth.authentication, auth.authorization, bloggerController.createBlog);

//===================get blogs======================///

router.get("/blogs",auth.authentication, bloggerController.getBlogs);

//===================Put update======================//

router.put("/blogs/:blogId", auth.authentication,auth.authorization, bloggerController.updateBlog);

//==================== delete data/Update data By path param======================//

router.delete("/blogs/:blogId", auth.authentication, auth.authorization, bloggerController.deleteblog);

//=====================delete data/Update data By query param==================//

router.delete("/blogs", auth.authentication, bloggerController.deletebyquery);


module.exports = router;
