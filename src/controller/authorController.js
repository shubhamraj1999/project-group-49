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


