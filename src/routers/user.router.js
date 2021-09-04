const express = require('express')
const router = express.Router();
const { insertUser, getUserbyEmail } = require("../model/user/User.model")
const {hashPassword, comparePassword} = require("../helpers/bycrypt.helper")
const {createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper")

router.all('/', (req, res, next) => {
    next()
})

router.post('/', async (req, res) => {
    const {name, department, phone, email, password} = req. body
    try {
        //hash password
        const hashPass = await hashPassword(password)
        const newUserObj = {
            name,
            department,
            phone,
            email,
            password:hashPass,
        }


        const result = await insertUser(newUserObj)
        console.log(result)
        res.json({ message: "New user created", result })
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message })
    }




})

//user sign in router
router.post('/login', async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body
    if(!email || !password) {
      return res.json({ status: "error", message: "No Valid credentials"})
    }
    const user = await getUserbyEmail(email)
    const passFromDb = user && user.id ? user.password : null

    if(!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password"})
    }

    const result = await comparePassword(password, passFromDb);
    console.log(result)
    if(!result) {
        return res.json({ status: "error", message: "Invalid email or password"})
    }

    const accessJWT = await createAccessJWT(user.email)

    const refreshJWT = await createRefreshJWT(user.email)

    res.json({status: "success", message: "Login success"})
})


module.exports = router