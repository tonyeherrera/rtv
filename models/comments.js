const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment:{
        type: String,
        required: true
    },
    topic:{
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    voter:{
        type:Schema.Types.ObjectId,
        ref:"Voter",
        required:true
    },
    author:{
        type: String,
        ref:"Voter",
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)