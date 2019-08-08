const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async(req, res, next) => {
   try {
       const token = req.header('Authorization').replace('Bearer ','');
       const decode = jwt.verify(token,'this is new user');
       const user = await User.findOne({ _id:decode._id,'tokens.token':token });

       if(!user){
           throw new Error()
       }
       req.user = user 
       next();
   } catch (error) {
       res.status(401).send({error:'unauthorize'});
   }
}

module.exports = auth;