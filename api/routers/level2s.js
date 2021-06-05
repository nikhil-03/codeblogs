const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Theory = require('../models/theory');

router.get("/",(req,res,next)=>{
    // res.render("level3");
    Theory.find({},function(err,found){
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
            res.render("level2" , {found:found})
        }
    })

})
router.get("/alltopics",(req,res,next)=>{
    Theory.find({},function(err,question){
        res.render("topic-search-main",{question:question});
})
})

router.get("/upload",(req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.render("writetheory")
    }
    else res.render("login")
})
router.post('/',(req,res,next)=>{
    const theory=new Theory({
        _id:mongoose.Types.ObjectId(),
        tag:req.body.tag,
        heading:req.body.heading,
        theory:req.body.theory,
        difficult:req.body.difficult,
        link:req.body.link,
        ytlink:req.body.ytlink
    });
    theory.save()
    .then(results=>{
        console.log(results);
        res.status(201).json({
            message:"handling post req",
            createdBlog:{
                tag:results.tag,
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
router.get("/autocomplete",function(req,res){
    var regex = new RegExp(req.query["term"],'gi');

    var filter=Theory.find({tag:regex},{'tag':1}).sort({"update_at":-1}).sort({"created_at":-1}).limit(20);

      filter.exec(function(err,data){
          
          var result=[];
          if(!err){
              if(data && data.length && data.length>0){
                  data.forEach(user=>{
                      let obj={
                          id:user._id,
                          label:user.tag
                        };
                       result.push(obj); 
                  });
              }
              res.jsonp(result);
          }
          else { res.se }  
      })     
})
router.get("/level2/autocomplete",function(req,res){
    var regex = new RegExp(req.query["term"],'gi');

    var filter=Theory.find({tag:regex},{'tag':1}).sort({"update_at":-1}).sort({"created_at":-1}).limit(20);

      filter.exec(function(err,data){
          
          var result=[];
          if(!err){
              if(data && data.length && data.length>0){
                  data.forEach(user=>{
                      let obj={
                          id:user._id,
                          label:user.tag
                        };
                       result.push(obj); 
                  });
              }
              res.jsonp(result);
          }
          else { res.se }  
      })     
})
router.post("/search-item-name",(req,res)=>{
    const x = req.body.fltrname;
    console.log(x.length);
   if(x.length>0)
   {
    Theory.find({tag:x }).exec((err,found)=>{
        if(!err)
        {
            console.log(found);
            res.render("level2",{found : found});
        }
        else if(!err)
        {
            res.render("level2",{found : found});
        }
    })
   }
   else
   {
    Theory.find({}).exec((err,found)=>{
        if(!err)
        {
            console.log(found);
            res.render("level2",{found : found});
        }
        else if(!err)
        {
            res.render("level2",{found : found});
        }
    })
   }
    
})

module.exports=router;