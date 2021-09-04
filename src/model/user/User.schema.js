const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password is not valid')
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        default:0,
        validate(value) {
            if (value = 0) {
                throw new Error('Phone number is not valid')

            }
        }
    }
})

module.exports = {
    UserSchema:mongoose.model('User', UserSchema)
}