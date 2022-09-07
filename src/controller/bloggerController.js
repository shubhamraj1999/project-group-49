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
        return res.status(200).send({ status: true, msg: [blogger, publishedAt] })
    }
}



const getBlogs = async function (req, res) {
    let data1 = req.query
    if (!data1) {
        return res.status(404).send({ status: false, msg: "please enter valid data " })
    }
    let data = await createBloggerModel.find({ $and: [data1, { isDeleted: false }, { isPublished: true }] }).populate("authorId")
    return res.status(200).send(data)
}


    const updateBlog = async function (req, res) {
        try {
           let getId = req.params.blogId
           let data = req.body
           let updateId = await createBloggerModel.findOne({ _id: getId })
           if (updateId) {
              if (updateId.isDeleted === false) {
                 let update = await createBloggerModel.findByIdAndUpdate(getId, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, category: data.category }, { new: true })
                 return res.status(200).send({ status: true, msg: update })
              }
              else {
                 return res.send("CANT UPDATE , IT IS DELETED")
              }
           } 
           else {
              return res.status(401).send({ status: false, msg: "Please enter valid Blog id" })
           }
        } catch (error) {
           console.log(error.message)
           return res.status(500).send(error.message)
        }
     }
     

const deleteblog = async function (req, res) {
    try {
        let id = req.params.blogId

        if (!id) {
            return res.status(404).send({ status: false, msg: "id not found" })
        }
        let deletes = await createBloggerModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } }, { new: true })
        return res.status(200).send({ msg: "user deleted successfully", data: deletes })

    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
// my mame is faheem
const deletebyquery = async function (req, res) {
    data = req.query

    let find = await createBloggerModel.findOne(data)

    if (!find) { return res.status(404).send({ status: false, msg: "Blog is not created" }) }
    if (find.isDeleted == true) { return res.status(400).send({ status: false, msg: "THIS DOCUMENT Is deleted" }) }
    let saved = await createBloggerModel.findOneAndUpdate(data, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
    res.status(200).send({ status: true, msg: saved })

}





module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteblog = deleteblog
module.exports.deletebyquery = deletebyquery


