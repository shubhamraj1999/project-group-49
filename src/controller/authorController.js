const createAuthorModel = require("../model/authorModel.js")
const validator = require("validator")

const createAuthor = async function (req, res) {
    let data = req.body;
    let email = data.email;
    if(!validator.isEmail(email)){
        return res.status(400).send({status:false, msg:"invalid email Id"})
    }
let validEmail = await createAuthorModel.findOne({email:email})
    if (validEmail) {
        return res.send("This email Id is already registered") 
        }
    let savedData = await createAuthorModel.create(data)
        res.send({ msg: savedData })
    
}

module.exports.createAuthor = createAuthor


// ### POST /blogs
// - Create a blog document from request body. Get authorId in request body only.
// - Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
// - Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like [this](#successful-response-structure)
// - Create atleast 5 blogs for each author

// - Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)
