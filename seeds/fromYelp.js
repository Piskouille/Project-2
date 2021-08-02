require('dotenv/config')
const axios = require('axios')
const dataSeed = []
const mongoose = require("mongoose");
const FoodType = require('../models/FoodType')



async function DBconnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          });
    
          await FoodType.create({name: "italian"}) 
        const foodTypesData = await FoodType.find() 
    
        console.log(foodTypesData)
    }
    catch{
        console.log("DB connection error")
    }
} 

async function yelpAPICall(){
    const res = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}` 

        },
        params :{
            term: "Restaurant",
            location: "Paris",
            limit: "1"
        }

    })

    res.data.businesses.forEach(async resto => {
        const resResto = await axios.get('https://api.yelp.com/v3/businesses/' + resto.id, {
            headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}` 
    
            }
        
        });
        const resRestoData = resResto.data
       
        dataSeed.push({
            name: resRestoData.name,
            coordinates: {lat: resRestoData.coordinates.latitude, long: resRestoData.coordinates.longitude},
            adress: resRestoData.display_address,
            phone: resRestoData.display_phone,
            price: resResto.price

        })
    })


}

DBconnect()
yelpAPICall()

