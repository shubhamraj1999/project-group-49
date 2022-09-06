const createBloggerModel = require("../model/blogModel")
const createAuthorModel = require("../model/authorModel");
const moment = require("moment")
const createBlog = async function (req, res) {

    let data = req.body;
    let authorId = req.body.authorId
    let publishedAt = moment().format("DD/MM/YYYY,h:mm:ss")

    let checkAuthorId = await createAuthorModel.findById(authorId)
    if (!authorId) {
        return res.status(401).send({ status: false, msg: "please put authorId" })
    }
    else if (!checkAuthorId) {
        return res.status(403).send({ status: false, msg: "please enter a valid userId" })
    } else {
        let blogger = await createBloggerModel.create(data)
        return res.status(200).send({ status: true, msg: [blogger,publishedAt] })
    }

}





const getBlogs = async function (req, res) {
    let data1 = req.query
 if(!data1){
    return res.status(404).send({status:false, msg:"please enter valid data "})
 }
    // let authorId = req.query.authorid
    // let category = req.query.category
    // let tag = req.query.tag
    // let subcategory = req.query.subcategory
    // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    // let data = await createBloggerModel.find({ isDeleted: false, isPublished: true}[ {authorId: authorId}|| {category: category}||{ tags: tag}|| {subcategory: subcategory }]).populate("authorId")
    let data = await createBloggerModel.find({ $and: [data1, { isDeleted: false}, {isPublished: false }] }).populate("authorId")
    return res.status(200).send(data)

}

const updateData = async function (req, res) {
    let data = req.body
    let data1 = data.subcategory
    let data2 = data.tags


    let updatedtags = Blog.tags
    let updatedtSubcategory = Blog.subcategory
    updatedtags.push(data2)
    updatedtSubcategory.push(data1)
    let updatedBlog = await createBloggerModel.findByIdAndUpdate({ _id:Blog },  data )
    res.send(updatedBlog)
}

const deleteblog= async function(req , res){
    try{
       let id = req.params.blogId
       
       if (!id){
        return res.status(404).send({status:false,msg:"id not found"})
       }
       let deletes = await createBloggerModel.findOneAndUpdate({_id:id},{$set:{isDeleted:true}},{new:true})
       return res.status(200).send({msg : "user deleted successfully", data : deletes})
       
    }
    catch(err){
       res.status(500).send({msg : err.message})
    }
 }
 

module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateData = updateData
module.exports.deleteblog = deleteblog
//     ### GET /blogs
// - Returns all blogs in the collection that aren't deleted and are published
// - Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure)
// - If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure)
// - Filter blogs list by applying filters. Query param can have any combination of below filters.
//   By author Id
//   - By category
//   - List of blogs that have a specific tag
//   - List of blogs that have a specific subcategory
// example of a query url: blogs?filtername=filtervalue&f2=fv2



