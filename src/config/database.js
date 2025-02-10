const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection = async () => {
   
     
        
        await mongoose.connect(process.env.DATABASE_URI)
       
  
};

module.exports = dbconnection;
