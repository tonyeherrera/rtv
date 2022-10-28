const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    upvotes:[{
            type:String
    }],
    downvotes:[{
            type:String
    }],
    voter:{
        type: Schema.Types.ObjectId,
        ref:"Voter",
        required: true
    },
    author:{
        type: String,
        ref: "Voter",
        required: true
    }
})

module.exports = mongoose.model("Topic", topicSchema)