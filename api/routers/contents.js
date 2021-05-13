const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Blog=require("../models/blogs");

router.get("/",(req,res,next)=>{

    res.render("contents");

})



router.get("/:topic",(req,res,next)=>{
  console.log(req.params.topic);

    // res.render("contents");
    Blog.find({topic:req.params.topic},function(err,found){
        if(err){
            console.log(err);
            res.status(500).json({error:err});
        }
        else if(!found)
        {
            res.status(404).json({message:"N data found"});
        }
        else{
            console.log(found);
            // res.status(200).json({message:found});
            res.render("contents",{found:found , topic:req.params.topic})
        }
    })
})




module.exports=router;