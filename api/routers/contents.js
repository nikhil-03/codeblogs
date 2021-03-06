const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Blog=require("../models/blogs");

router.get("/",(req,res,next)=>{

    res.render("contents");
    // if(req.isAuthenticated())
    // {
    //    res.render("contents");
    // }
    // else 
    // {
    //     res.redirect("/")
    // }

})

router.get("/update/:topic",(req,res,next)=>{
    console.log(req.params.topic);
  
      // res.render("contents");
      if(req.isAuthenticated())
      {
        Blog.find({topic:req.params.topic},function(err,found){
            if(err){
                console.log(err);
                res.status(500).json({error:err});
            }
            else if(!found)
            {
                res.status(404).json({message:"No data found"});
            }
            else{
                console.log(found);
                // res.status(200).json({message:found});
                res.render("updateblog",{found:found , topic:req.params.topic})
            }
        })
      }
    else 
      {
        res.render("login")
      }
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
            res.status(404).json({message:"No data found"});
        }
        else{
            console.log(found);
            // res.status(200).json({message:found});
            res.render("contents",{found:found , topic:req.params.topic})
        }
    })
})




module.exports=router;