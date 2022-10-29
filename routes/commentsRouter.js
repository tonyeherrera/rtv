const express = require('express')
const commentsRouter = express.Router()
const Comment = require('../models/comments.js')


//get comments
commentsRouter.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

//post comment
commentsRouter.post('/:topicId', (req, res, next) => {
    req.body.topic = req.params.topicId
    req.body.voter = req.auth._id
    req.body.author = req.auth.username
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) =>
        {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//delete comment
commentsRouter.delete('/:commentId', (req, res, next) =>{
    Comment.findOneAndDelete(
        {_id: req.params.commentId, voter: req.auth._id},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send('Successfully deleted comment')
        }
    )
})

//edit comment
commentsRouter.put('/:topicsId/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId, voter: req.auth._id},
        req.body,
        {new: true},
        (err, updatedComment) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

module.exports = commentsRouter