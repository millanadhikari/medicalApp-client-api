const express = require('express')
const router = express.Router();
const { insertUser, getUserByEmail, getUserById, storeUserRefreshJWT } = require("../model/user/User.model")
const { hashPassword, comparePassword } = require("../helpers/bycrypt.helper")
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper")
const { userAuthorization } = require("../middlewares/authorization.middleware")
const { setPasswordResetPin } = require("../model/resetPin/ResetPin.model")
const { deleteJWT } = require("../helpers/redis.helper")

router.all('/', (req, res, next) => {
    next()
})

//Get user profile routers
router.get("/", userAuthorization, async (req, res) => {
    //this data coming from database

    const _id = req.userId

    const userProf = await getUserById(_id)
    const { name, email } = userProf;

    res.json({
        user: {
            _id,
            name,
            email,
        },
    });
});




router.post('/', async (req, res) => {
    const { name, department, phone, email, password } = req.body
    try {
        //hash password
        const hashPass = await hashPassword(password)
        const newUserObj = {
            name,
            department,
            phone,
            email,
            password: hashPass,
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
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ status: "error", message: "No Valid credentials" })
    }
    const user = await getUserByEmail(email)
    const passFromDb = user && user.id ? user.password : null

    if (!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }

    const result = await comparePassword(password, passFromDb);
    console.log(result)
    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }
    console.log(typeof user._id)
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)

    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)

    res.json({ status: "success", message: "Login success", accessJWT, refreshJWT })
})

//email the pin

//reset password and refresh
router.post("/reset-password", async (req, res) => {
    const { email } = req.body

    const user = await getUserByEmail(email)

    if (user && user._id) {
        const setPin = await setPasswordResetPin(email, user)
        return res.json(setPin)

    }

    res.json({ status: "error", message: "If the email exist in our databse, the password reset pin will be sent shortly" })
})

//User logout and invalidate jwts

router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization } = req.headers
    //this data coming from database

    const _id = req.userId

    //delete accessJWT from redis database

    deleteJWT(authorization);
    //delete freshjwt from mongodb
    const result = await storeUserRefreshJWT(_id, '')

    if (result._id) {
        return res.json({ status: "success", message: "Logged out successfully" });
    }

    res.json({
        status: "error",
        message: "Unable to logg you out, plz try again later",
    });
})





module.exports = router