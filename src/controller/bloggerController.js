const bloggerModel = require("../model/blogModel");

const authorModel = require("../model/authorModel");



///    ==================== CREATE BLOGS ======================================///

const createBlog = async function (req, res) {
    try {
        let data = req.body;

        let { body, title, authorId, category } = data

        if (!body || body == " ") return res.status(400).send({ status: false, msg: "body is mandatory" })

        if (!title || title == " ") return res.status(400).send({ status: false, msg: "please use title" })

        if (!authorId) return res.status(400).send({ status: false, msg: "please use authorId" })
        if (authorId.length < 24 || authorId.length > 24) return res.status(404).send({ status: false, msg: "please use valid authorId" })

        if (!category || category == " ") return res.status(400).send({ status: false, msg: "please use category" })

        let checkAuthorId = await authorModel.findById(authorId);
        if (!checkAuthorId) return res.status(400).send({ status: false, msg: "please enter a valid authorId" })
        
        let blogger = await bloggerModel.create(data)

        return res.status(201).send({ status: true, data: blogger })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.messege })
    }

}
/// ===================  GET BLOGS =======================================================///

const getBlogs = async function (req, res) {
    try {
        let getQuery = req.query
        let {tags, category, authorId, subcategory} = getQuery;
        
        if(!tags==tags || tags=="" ) return res.status(400).send({status:false, msg:"blog not found with this tag"})
        
        
        if(!category==category || category=="" ) return res.status(400).send({status:false, msg:"Please enter correct category"})
        
        if(!authorId==authorId || authorId=="" ) return res.status(400).send({status:false, msg:"Please enter correct authorId"})
        
        if(!subcategory==subcategory || subcategory=="" ) return res.status(400).send({status:false, msg:"Please enter correct subcategory"})
        
        let data = await bloggerModel.find({ $and: [getQuery, { isDeleted: false }, { isPublished: true }] }).populate("authorId")
        
        if(Object.keys(data).length==0) return res.status(400).send({status:false, msg:"Please enter filter to get blogs"})
        

        if (!data) return res.status(404).send({ status: false, msg: "blogs does not exist with this filters" })
        return res.status(200).send({status:true, data:data})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

/// ====================== UPDATE BLOGS  ===================================================///

const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId

        let data = req.body
        if(Object.keys(data).length==0) return res.status(400).send({status:false, msg:"please use data to update blog"})
        let {tags, subcategory, title, body} = data
        
        if(!tags==tags || tags=="" ) return res.status(400).send({status:false, msg:"please use valid tags to update"})
        
        
        if(!subcategory==subcategory || subcategory=="" ) return res.status(400).send({status:false, msg:"please use valid subcategory to update"})
        
        
        if(!title==title || title=="" ) return res.status(400).send({status:false, msg:"please use valid title to update"})
        
        if(!body==body || body=="" ) return res.status(400).send({status:false, msg:"please use valid body to update"})

        let updateId = await bloggerModel.findOne({ _id: blogId })

        if (updateId) {
            if (updateId.isDeleted === false) {
                let update = await bloggerModel.findByIdAndUpdate(blogId, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, category: data.category, isPublished: true, publishedAt: Date.now() }, { new: true })
                return res.status(200).send({ status: true, message: update })
            }
            else {
                return res.send("CAN'T UPDATE , IT IS DELETED")
            }
        }
        else {
            return res.status(404).send({ status: false, msg: "Blog not found with this blogId" })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

///  =====================  DELETE BLOGS BY PATH PARAMS  ===================================///

const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (!blogId) {
            return res.status(400).send({ status: false, msg: "id not found" })
        }
        let blogid = await bloggerModel.findById(blogId)

        if (!blogid) {
            return res.status(404).send("Blog does not exist with this blogId")
        }
        if (blogid.isDeleted == false) {
            let deletes = await bloggerModel.findOneAndUpdate({ _id: blogId }, {
                $set: { isDeleted: true },
                deletedAt: Date.now()
            }, { new: true })
            return res.status(200).send({status:true,message:"Blog deletion is successful", data:deletes })
        }
        else {
            res.status(404).send({ status: false, msg: 'Blog not found or blog already deleted' })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

///    ================== DELETE BLOGS BY QUERY PARAMS ======================================///

const deletebyquery = async function (req, res) {
    try {
        
        let data = req.query
        let authorId = data.authorId

        if(authorId){
            let userToken = req.token.authorId
            if (authorId !== userToken) {
                return res.status(403).send({ status: false, msg: "you are not authorised for delete blog" })
            }
        }
        if(!authorId) return res.status(400).send({ status: false, msg: "you have to your authorId to delete your blogs" })
        
        if(Object.keys(data).length==0)  { return res.status(400).send({ status: false, msg: "you have to put something in query filter to delete your blogs" }) }

        let find = await bloggerModel.findOne(data)

        if (!find) { return res.status(404).send({ status: false, msg: "Author not found with this query filter" }) }

        if (find.isDeleted == true) { return res.status(400).send({ status: false, msg: "This Document Is deleted" }) }

        let savedData = await bloggerModel.findOneAndUpdate(data, { $set: { deletedAt: Date.now(), isDeleted: true } }, { new: true })
        return res.status(200).send({ status: true, message:savedData})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})

    }

}
module.exports = { createBlog, getBlogs, updateBlog, deleteblog, deletebyquery }