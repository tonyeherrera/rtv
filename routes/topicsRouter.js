const express = require('express')
const topic = require('../models/topic.js')
const topicsRouter = express.Router()
const Topic = require('../models/topic.js')

//get all topics
topicsRouter.get('/', (req, res, next) => {
    Topic.find((err, topics) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(topics)
    })
})
//get topics by voter Id
topicsRouter.get('/voter', (req, res, next) => {
    Topic.find({voter: req.auth._id}, (err, topics) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(topics)
    })
})

//get one topic by topic id
topicsRouter.get('/:topicId', (req, res, next) => {
    Topic.findOne(
        {_id: req.params.topicId},
        (err, topicDetails) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(topicDetails)
    })
})

//post new topic
topicsRouter.post('/', (req, res, next) => {
    req.body.voter = req.auth._id
    req.body.author = req.auth.username
    const newTopic = new Topic(req.body)
    newTopic.save((err, savedTopic) => {
        if(err){
        res.status(500)
        return next(err)
        }
        return res.status(201).send(savedTopic)
    })
})

//delete topic
topicsRouter.delete('/:topicId', (req, res, next) => {
    Topic.findOneAndDelete(
        {_id: req.params.topicId},
        (err, deletedTopic) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send
            (`Successfully deleted topic ${deletedTopic}`)
        }
    )
})

//edit 
topicsRouter.put('/:topicId', (req, res, next) => {
    Topic.findOneAndUpdate(
        {_id: req.params.topicId},
        req.body,
        {new: true},
        (err, updatedTopic) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedTopic)
        }
    )
})

module.exports = topicsRouter