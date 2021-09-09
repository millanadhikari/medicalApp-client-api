const express = require('express')
const router = express.Router();
const { insertPatient } = require("../model/patient/Patient.modal")

router.all('/', (req, res, next) => {


    // res.json({message:"Patient details"});



    next()
})




router.post("/", async (req, res) => {
    try {
        const { name, email, modifier, updates } = req.body

        const patientObj = {
            clientId: "4545fg45",
            name,
            email,
            modifiers: [
                {
                    modifier,
                    updates,
                }
            ],



        }

        const result = await insertPatient(patientObj)
        console.log(result)

        if (result._id) {
            return res.json({ status: "success", message: "Patient has been created!!!" })
        }

        res.json({ status: "error", message: "Unable to create new patient, please try again later" })

    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new patient, please try again latedr" })
    }
})


module.exports = router