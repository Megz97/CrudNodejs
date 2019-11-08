
const userModel=require('../models/User');
const express =require('express');
const router = express.Router();
const accessToken = require('../models/accessToken');
let md5 = require('md5');
let uuid=require('uuid');



router.post('/login', async(req , res)=>{
try{
    const user =await userModel.findOne({Email : req.body.Email}).exec();    
    if(user){
        if(user.Password==md5(req.body.Password)){
            var token = uuid();
            const newAccessToken = new accessToken({
                accessToken :  token,
                usersID : user._id
            })
            await newAccessToken.save();
            return res.status(200).json({token:token});
        }else {
            return res.status(500).json(err);            
        }
    }
}catch(err){
    console.log(err);
    return res.status(500).json(err);
}
    
});

module.exports = router;
