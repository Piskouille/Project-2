require('dotenv/config')
const axios = require('axios')
const mongoose = require("mongoose");
const FoodType = require('../models/FoodType')
const Restaurant = require('../models/Restaurant')
const loremIpsum = require("lorem-ipsum").loremIpsum;

const PICTS = [
    "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/4450334/pexels-photo-4450334.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/5490933/pexels-photo-5490933.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/5220092/pexels-photo-5220092.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/4577740/pexels-photo-4577740.jpeg?auto=compress&cs=tinysrgb&h=350"
]

function randomPict(picts){
    const rdm = Math.floor(Math.random() * picts.length)
    return picts[rdm]
}

async function DBconnect(){
    
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          });

        //   await Restaurant.deleteMany({}, function(err) { 
        //     console.log('collection removed') 
        //   })
    
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
                limit: "6"            }
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
 
              const checkFoodTypes = await FoodType.find()
              const check = checkFoodTypes.map(c => c.name)

                if(foodTypes.hasOwnProperty(cat.alias)){
                    seedFoodTypes.push(foodTypes[cat.alias])
                }
                else if(!check.includes(cat.alias)){
                    
                    const newFoodType = await FoodType.create({name: cat.alias}) 
                    seedFoodTypes.push(newFoodType.id)
                }
            }))
           
            dataSeed.push({
                name: resRestoData.name,
                coordinates: {lat: resRestoData.coordinates.latitude, lng: resRestoData.coordinates.longitude},
                address: {
                    street: [resRestoData.location.address1, resRestoData.location.address2, resRestoData.location.address3 ].join(' ').trim(),
                    city: resRestoData.location.city,
                    zipCode: resRestoData.location.zip_code,
                    country:  resRestoData.location.country,
                },
                phone: resRestoData.display_phone,
                priceRating: resRestoData.price.length,
                foodTypes: seedFoodTypes,
               // image: resRestoData.image_url  - la vache que leurs photos sont moches !!
                image : randomPict(PICTS),
                description : loremIpsum({
                  count: Math.floor(Math.random() * 10) + 16,
                  units: "words"
              })
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
