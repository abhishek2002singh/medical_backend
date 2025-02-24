const  express=require('express')


const authRouth = express.Router();
const User = require('../models/user');
const  bcrypt = require('bcrypt')
const {validateSignUpData} = require('../utils/validateSignUpData');

authRouth.post('/signup' , async(req , res)=>{
    
   
    try{
      //validation of data
      
      validateSignUpData(req)  
  
      const {firstName ,lastName , emailId ,password} = req.body
  
      //encrypt the password
      const passwordHash = await bcrypt.hash(password , 10);

      const user = new User({
        firstName ,
        lastName ,
        emailId ,
        password:passwordHash
      })
      const savedUser =await user.save()

      const token = await savedUser.getJWT();
  
     
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        expires: new Date(Date.now() + 8 * 3600000)
    });

      
      res.status(201).json({ message : ' signup successfully' , data :savedUser ,token})

      
  
    }catch(err){
      res.status(401).send("Error :" +err.message)
  
    }
  })

  //lognin the user
  authRouth.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Email ID not present in the database");

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) throw new Error("Password is not correct");

        const token = await user.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            expires: new Date(Date.now() + 8 * 3600000)
        });

        res.status(201).json({ message: 'Signin successfully', data: user, token });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


  authRouth.post('/logout' , (req ,res)=>{
    res.cookie("token" , null , {
        expires: new Date(Date.now())

    })
    res.send("logout successfully")
  })

  module.exports = authRouth

