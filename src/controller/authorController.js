const createAuthorModel = require("../Models/authorModel.js")

const createAuthor = async function(req,res){
    let data = req.body
    let savedData = await createAuthorModel.create(data)
    res.status(201).send({status:true, msg:savedData})
}

module.exports.createAuthor = createAuthor


