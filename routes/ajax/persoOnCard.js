const express = require("express");
const router = express.Router();
const isAuthenticated = require('../../middlewares/isAuthenticated')
const Favorite = require('../../models/Favorite')

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



module.exports = router