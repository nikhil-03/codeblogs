const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
// const multer = require('multer');
const Codeblog=require("../models/blogs");

router.get("/",(req,res,next)=>{
    res.render("writeblogs");
})

router.post("/",(req,res,next) =>{
    const blog = new Codeblog({
        _id:mongoose.Types.ObjectId(),
        topic:req.body.topic,
        title:req.body.title,
        content:req.body.content,
        tags : req.body.tags,
        link : req.body.link
    });
    blog.save()
    .then(results=>{
        console.log(results);
        res.status(201).json({
            message:"handling post req",
            createdBlog:{
                topic:results.topic,
                content:results.content,
                request:{
                    type:"GET"
                }
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports=router;