const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
// const multer = require('multer');
const Codeblog=require("../models/blogs");

// router.get("")

router.get("/delete/:blogid",(req,res,next)=>{
    // res.render("writeblogs");
    console.log(req.params.blogid);
    Codeblog.findByIdAndRemove({_id:req.params.blogid},function(err,data){
        if(err){ console.log(err); }
        else if(!err)
        {
            console.log("sucessfully deleted");
            res.redirect("/");
        }
    })
})

router.get("/update/:blogid",(req,res,next) =>{
    // console.log(req.params.blogid);
    const id=req.params.blogid;
    Codeblog.findOne({_id:id},function(err,found){
        if(err)
        { console.log(err); }
        else if(!found)
        {
            res.status(404).json({message:"No data found"});
        }
        else
        {
            res.render("finalupdate",{found:found});
        }
    })
})

router.post("/update/:id",(req,res)=>{
    const id=req.params.id;
    Codeblog.findOne({_id:id},function(err,found){
        if(err){
            console.log(err);
            res.status(500).json({error:err});
        }
        else if(!found)
        {
            res.status(404).json({message:"No data"});
        }
        else{
            if(found.topic  ){found.topic   =req.body.topic; }
            if(found.title  ){found.title   =req.body.title; }
            if(found.content){found.content =req.body.content; }
            if(found.tags   ){found.tags    =req.body.tags; }
            if(found.link   ){found.link    =req.body.link; }
    
            found.save(function(err,updated){
                if(err){ console.log(err); }
                else{
                console.log("Sucess , Done");
                res.redirect("/contents/"+req.body.topic); 
                }
            }) 

            
            // const url=req.body.topic;
            
        }
    })
})


module.exports=router;