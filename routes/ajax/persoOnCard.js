const express = require("express");
const router = express.Router();
const isAuthenticated = require('../../middlewares/isAuthenticated')
const Favorite = require('../../models/Favorite')
const Note = require('../../models/Note')

router.post('/favorite/:cardId', isAuthenticated, async (req, res, next) => {
    try{
        const cardId = req.params.cardId
        const userId = (req.user || req.session.currentUser) 

        const data = await Favorite.create({user: userId, restaurant: cardId})
        res.status(200).json(data)
      
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})

router.get('/favorite/:cardId', isAuthenticated, async (req, res, next) => {
    try{
        const cardId = req.params.cardId
        const userId = (req.user || req.session.currentUser) 

        const data = await Favorite.deleteOne({user: userId, restaurant: cardId})
        res.status(200).json(data)
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})

router.get('/note/:noteId', isAuthenticated, async (req, res, next) => {

    try{
        const noteId = req.params.noteId
        const userId = (req.user || req.session.currentUser) 
        
        const data = await Note.find({user: userId, restaurant: noteId})
        res.status(200).json(data)
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})


router.post('/note/:noteId', isAuthenticated, async (req, res, next) => {

    try{
        const noteId = req.params.noteId
        const userId = (req.user || req.session.currentUser) 
        const noteData = req.body
        console.log(noteData)
        const existsAlready = await Note.find({user: userId, restaurant: noteId})
    
        if(existsAlready.length === 0){
            console.log('create')
            const data = await Note.create({user: userId, restaurant: noteId, content: noteData.data})
            return res.status(200).json(data)
        }

        const data = await Note.findByIdAndUpdate(existsAlready._id, {user: userId, restaurant: noteId, content: noteData.data}, {new: true})
        console.log('RESSSSS', data)
        return res.status(200).json(data)
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})



module.exports = router