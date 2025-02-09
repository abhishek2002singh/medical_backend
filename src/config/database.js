const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection = async () => {
   
     
        console.log(process.env.DATABASE_URI)
        await mongoose.connect('mongodb://localhost:27017/medical')
       
  
};

module.exports = dbconnection;
