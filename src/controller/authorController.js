const authorModel = require("../model/authorModel.js");

const jwt = require("jsonwebtoken");

const matchPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const checkName=/^[a-z\s]+$/i

const emailMatch = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/

//==========================Creeate Author=======================================///

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "please use data to create author" })

        if (!fname || fname == "") return res.status(400).send({ status: false, msg: "please enter fname" })
        if (!checkName.test(fname)) return res.status(400).send({ status: false, msg: "Use only alphabets" })
        const Fname= fname.charAt(0).toUpperCase()+fname.slice(1).toLowerCase()
        data.fname=Fname

        if (!lname || lname == "") return res.status(400).send({ status: false, msg: "please use lname" })
        if (!checkName.test(lname)) return res.status(400).send({ status: false, msg: "Use only alphabets" })
        const Lname= lname.charAt(0).toUpperCase()+lname.slice(1).toLowerCase()
        data.lname=Lname

        if (!title || title == "") return res.status(400).send({ status: false, msg: "please use title" })
        if (title!=="Mr" && title!=="Mrs" && title!=="Miss") return res.status(400).send({status:false, msg:"please use title correctly"})

        if (!email) return res.status(400).send({ status: false, msg: "please use eamilId" })
        let validEmail = await authorModel.findOne({ email: email })
        if (validEmail) return res.status(400).send("This email Id is already registered")
        if (!email.match(emailMatch)) return res.status(400).send({ status: false, msg: "please use valid emailId" })

        if (!password) return res.status(400).send({ status: false, msg: "please use password to create author" })
        if (password.length <= 6) return res.status(400).send({ status: false, msg: "please use more than six characters" })
        if (!matchPass.test(password)) return res.status(400).send({ status: false, msg: "please use special character  to make strong password" })

        let savedData = await authorModel.create(data)
        res.status(201).send({status:true, data: savedData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

//===================================Login Author ===========================//

const loginAuthor = async function (req, res) {
    try {
        let data = req.body
        let {email, password} = data
        if(Object.keys(data).length==0) return res.status(400).send({status:false, msg:"please use data to login"})
        if(!email || !password) return res.status(400).send({status:false, msg:"please use email or password to login"})

        let author = await authorModel.findOne(data)
        if(!author) return res.status(404).send({status:false, msg:"Author not found, please use correct email or password"})
        let token = jwt.sign(
            {
                authorId: author._id.toString(),
                batch: "plutonium",
                organisation: "FunctionUp",
            },
            "mini-project"
        );
        return res.status(201).send({ status: true, msg: "token generated successfully", data:{token:token }})
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { createAuthor, loginAuthor }
