const express = require("express");
const router = express.Router();
const Favorite = require('../../models/Favorite')

router.get('favorite/:id', async (req, res, next) => {
    console.log(req.params)
    try{
        const id = req.params.id
        const data = await Sneaker.find({id_tags: id})

        res.status(200).json(data)
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})

router.post('/nofilter', async (req, res, next) => {

    try{
        const data = await Sneaker.find()

        res.status(200).json(data)
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})


module.exports = router