const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const voterSchema = new Schema({
    username:{
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        requrire: true
    },
    memberSince:{
        type: Date,
        default: Date.Now
    }
})

voterSchema.pre('save', function(next){
    const voter = this
    if(!voter.isModified('password')) return next()
    bcrypt.hash(voter.password, 10, (err, hash) => {
        if(err) return next(err)
        voter.password = hash
        next()
    })
})

voterSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

voterSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('Voter', voterSchema)