const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')


const PatientSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    address: {
        street: {
            type:String,
            trim:true,
            lowercase: true
        },
        city: {
            type:String,
            trim:true,
            lowercase: true
        },
        state: {
            type:String,
            trim:true,
            lowercase: true
        },    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    admittedDate: {
        type: Date,
        trime: true,
        default: Date.now()

    },
    treatmentDepartment: {
        type: String,
        time: true,
        lowercase: true,
    },
    status: {
        type: String,
        maxlength: 30,
        default: "Pending operator response"
    },
    modifiers : [
        {
           modifier: {
                type: String,
                maxlength : 50,
                default: "",
                },
            modifiedAt: {
                type: Date,
                default: Date.now(),

            updates: {
                type: String,
                maxlength : 50,
                default: "",
                },
            }
        }
    ]

})

module.exports = {
    PatientSchema: mongoose.model("Patient", PatientSchema),
}