const express =require('express');
const router =express.Router();
const User =require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET="inotebook@Cloud"

//ROUTE 1: Create a User using: POST "/api/auth/createuser" Doesn't require login
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a password aleast 5 character').isLength({ min: 5 }),
], async(req,res)=>{
    let success=false
    //If any error found, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check the user email is already exist
    try{
    let user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success, error:"Sorry user already exist with this email"})
    }

   const salt= await bcrypt.genSalt(10);
   const secPass= await bcrypt.hash(req.body.password,salt);
    //Create a new user 
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
      })

      //Create a token which sent to user only user id
      const data={
            user:{
                id:user.id
            }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
        success=true
      res.json({success,authToken})
        res.json(user)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send(success,"Some error occured")

    }
})




//ROUTE 2: Authentication a user using: POST "/api/auth/login" Doesn't require login
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot blank').exists(),
], async(req,res)=>{
    let success=false
//If any error found, return bad request and the error
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({success, errors: errors.array() });
}

 const {email,password}=req.body;
 try {
    let user= await User.findOne({email})
    if(!user){
        return res.status(400).json({success, errors:"Please try to login with correct information"});  
    }
    const passwordCompare= await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({success, errors:"Please try to login with correct information"}); 
    }

 //Create a token which sent to user only user id
 const data={
    user:{
        id:user.id
    }
}
const authToken=jwt.sign(data,JWT_SECRET)
success=true;
res.json({success, authToken})


}     catch(error){
    console.error(error.message)
    res.status(404).send(body)

}
})



//ROUTE 3: Get user logged detail using: POST "/api/auth/getuser" Require login

router.post('/getuser',fetchuser, async(req,res)=>{
let success=false
try {
   const userId=req.user.id
    const user=await User.findById(userId).select("-password") 
    res.send(user)  
} catch (error) {
    console.error(error.message)
    res.status(500).send(success,"Interval server error")
}
})

module.exports=router