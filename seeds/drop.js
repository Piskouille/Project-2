require('dotenv/config')
const mongoose = require("mongoose");
const FoodType = require('../models/FoodType');
const Restaurant = require('../models/Restaurant');
const Favorite = require('../models/Favorite');
const Note =  require('../models/Note');
const User =  require('../models/User');


async function DBDrop(){
    
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          });

          await Restaurant.deleteMany({}, function(err) { 
            console.log('RESTAURANT DROPED') 
          })

          await FoodType.deleteMany({}, function(err) { 
            console.log('FOODTYPE DB DROPED') 
          })

          
          await Favorite.deleteMany({}, function(err) { 
            console.log('FAVORITE DB DROPED') 
          })

          
          await Note.deleteMany({}, function(err) { 
            console.log('NOTE DB DROPED') 
          })

          
          await User.deleteMany({}, function(err) { 
            console.log('USER DB DROPED') 
          })
        

          mongoose.connection.close(console.log('DB disconnected'))
        }
        catch(err){
            console.log('ERR DROPPING DB', err)
        }
    }

    DBDrop()