const express =require('express');
const router = express.Router();

const accessToken=require('../../models/accessToken');


router.all('*',async(req,res,next)=>{
    console.log("11111111");
    
  var token=req.get("authorization");
    if(!token){
       return res.status(401).json("Access Denied");
    }
    const exisitToken=await accessToken.findOne({accessToken: token}).populate('usersID',"-Password -__v");
    if(! exisitToken){
       return res.status(401).json("Access Denied");
    }
  req.user=exisitToken.userId;
  next()
})

module.exports = router;
