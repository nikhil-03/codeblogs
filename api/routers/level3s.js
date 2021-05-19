const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Question = require('../models/questions');



router.get("/",(req,res,next)=>{
    // res.render("level3");
    Question.find({},function(err,found){
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
            res.render("level3" , {found:found})
        }
    })

})
router.get("/question",(req,res,next)=>{
    res.render("writequestion")
})
router.post('/',(req,res,next)=>{
    const question=new Question({
        _id:mongoose.Types.ObjectId(),
        tag:req.body.tag,
        question:req.body.question,
        explanation:req.body.explanation,
        difficult:req.body.difficult,
        link:req.body.link,
        ytlink:req.body.ytlink
    });
    question.save()
    .then(results=>{
        console.log(results);
        res.status(201).json({
            message:"handling post req",
            createdBlog:{
                topic:results.tag,
                content:results.question,
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