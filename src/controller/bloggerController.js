const createBloggerModel = require("../Models/bloggerModel.js")


const createBlog = async function(req,res){
    let data = req.body;
    let authorId = req.body.authorId
    let checkAuthorId = await createAuthorModel.findById(authorId)
    if(!authorId){
        res.status(401).send({status:false, msg:"please put authorId "})
    }	
    else if(!checkAuthorId){
        res.status(403).send({status:false, msg:"please enter a valid userId"})
    } else{
        let blogger = await createBloggerModel.create(data)
        res.status(200).send({status:true, msg:blogger})
    }
    res.status(500).send({status:false, msg:"server not found"})
}






module.exports.createBlog=createBlog

