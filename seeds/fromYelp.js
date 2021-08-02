require('dotenv/config')
const axios = require('axios')
const dataSeed = []

async function yelpAPICall(){
    const res = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}` 

        },
        params :{
            categories: "Restaurants",
            location: "Paris",
            limit: "20"
        }

    })

    res.data.businesses.forEach(resto => {
        const resResto = await axios.get('https://api.yelp.com/v3/businesses/' + resto.id, {
            headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}` 
    
            }
        
        });

        dataSeed.push({
            name: resResto.name,
            gps: {lat: resResto.coordinates.latitude, long: resResto.coordinates.longitude},
            
        })
    })

    console.log(OneRestaurant.data)
}


yelpAPICall()