// const jwt = require('jsonwebtoken')
// const User  = require('../models/user');


// const userAuth = async (req , res , next)=>{
//     try{ 
//         const getcookies = req.cookies
    
//          const  {token} = getcookies
//          if(!token){
//           return res.status(401).send("please login middleware")
//          }
    
//       //validate my token
//           const decodedMessage = await jwt.verify(token ,"MEDICAL@$790")
         
//           const {_id} = decodedMessage;
     
    
//           const accessUser = await User.findById(_id)
//           if(!accessUser){
//             throw new Error("user not found")
//           }
//            req.accessUser = accessUser
//          next()
        
    
//       }catch(err){
//         res.status(400).send("ERROR: " + err.message)
//     }

   

// }

// module.exports = {
    
//     userAuth ,
// }


const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    // Check if token exists
    if (!token) {
      return res.status(401).send("Unauthorized: Please login first");
    }

    // Verify token
    const decoded = jwt.verify(token, "MEDICAL@$790");
    const { _id } = decoded;

    // Find user by decoded ID
    const accessUser = await User.findById(_id);
    if (!accessUser) {
      return res.status(404).send("User not found");
    }

    // Attach user to request object
    req.accessUser = accessUser;
    next();

  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).send("Invalid or expired token");
    }
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };

