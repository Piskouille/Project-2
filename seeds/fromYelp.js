require('dotenv/config')
const axios = require('axios')
const mongoose = require("mongoose");
const FoodType = require('../models/FoodType')
const Restaurant = require('../models/Restaurant')



async function DBconnect(){
    const foodTypes = {}
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          });
    
        const foodTypesData = await FoodType.find() 
     
        const foodTypes = {}
        foodTypesData.forEach(foodtype => {
            foodTypes[foodtype.name] = foodtype._id
        })

        return foodTypes
    }
    catch(err){
        console.log("DB connection error", err)
    }
} 

async function yelpAPICall(foodTypes){
    const dataSeed = []

    try{
        const res = await axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}` 
            },
            params :{
                term: "Restaurant",
                location: "Paris",
                limit: "9"
            }
        })
    
        await Promise.all(res.data.businesses.map(async resto => {
            const resResto = await axios.get('https://api.yelp.com/v3/businesses/' + resto.id, {
                headers: {
                    Authorization: `Bearer ${process.env.YELP_API_KEY}` 
                }
            
            });
            
            const resRestoData = resResto.data
            const categories = resRestoData.categories
            const seedFoodTypes = []

            await Promise.all(categories.map(async cat => {
                if(foodTypes.hasOwnProperty(cat.alias)){
                    seedFoodTypes.push(foodTypes[cat.alias])
                }
                else{
                    const newFoodType = await FoodType.create({name: cat.alias}) 
                    seedFoodTypes.push(newFoodType.id)
                }
            }))
           
            dataSeed.push({
                name: resRestoData.name,
                coordinates: {lat: resRestoData.coordinates.latitude, long: resRestoData.coordinates.longitude},
                adress: {
                    street: [resRestoData.location.adress1, resRestoData.location.adress2, resRestoData.location.adress3 ].join(' ').trim(),
                    city: resRestoData.location.city,
                    zipCode: resRestoData.location.zip_code,
                    country:  resRestoData.location.country,
                },
                phone: resRestoData.display_phone,
                priceRating: resRestoData.price.length,
                foodTypes: seedFoodTypes
            })
        }))

        return dataSeed
    }
    catch(err){
        console.log('ERROR with Yelp API', err)
    }
   


}

async function seedFunction(){
    const types = await DBconnect();
    const dataSeed = await yelpAPICall(types)

    await Restaurant.create(dataSeed)

    mongoose.connection.close(console.log('DB disconnected'))

}



seedFunction()
