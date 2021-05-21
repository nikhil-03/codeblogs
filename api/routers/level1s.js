const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Noobie = require('../models/noobie');

router.get("/",(req,res,next)=>{
    // res.render("level3");
    Noobie.find({},function(err,found){
        if(err)
        {
            console.log(err);
        }
        else if(!found)
        {
            res.status(404).json({message:"No data"});
            console.log("No data");
        }
        else 
        {
            console.log(found);
            res.render("level1" , {found:found})
        }
    })

})

router.get("/upload",(req,res,next)=>{
    // res.render("writenoobie")
    if(req.isAuthenticated())
    {
        res.render("writenoobie")
    }
    else res.render("login")
})
router.post('/',(req,res,next)=>{
    const noobie=new Noobie({
        _id:mongoose.Types.ObjectId(),
        topic:req.body.topic,
        theory:req.body.theory,
        link:req.body.link,
        ytlink:req.body.ytlink
    });
    noobie.save()
    .then(results=>{
        console.log(results);
        res.status(201).json({
            message:"handling post req",
            createdBlog:{
                tag:results.topic,
                content:results.theory,
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