const express = require('express');
// const { rawListeners } = require('../../app');
const router = express.Router();
// const Product = require('../models/product');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const User = require('../models/user')

// router.get("/",(req,res,next)=>{
//     // res.render("index");
//     if(req.isAuthenticated())
//     {
//        res.render("index");
//     }
//     else 
//     {
//         res.redirect("/")
//     }
// })

router.get('/',(req,res,next)=>{
    if(req.isAuthenticated())
    {
        User.find({_id:req.user.id},function(err,found){
            if(err)
            {
                console.log(err);
            }
            else if(!found)
            {
                res.status(404).json({message:"No data found"});
            }
            else{
                console.log(found[0].name);
                res.render("index",{ found:found[0] });
            }
        })
    }
})




module.exports=router;