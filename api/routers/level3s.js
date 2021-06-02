const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Question = require('../models/questions');



router.get("/",(req,res,next)=>{
    // res.render("level3");
    const val=[];
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
            // console.log(found);
            res.render("level3" , {found:found , len:found.length, title:"",level:""})
            console.log(found.length);
            // res.render("question-level")
        }
    })

})

router.get("/upload",(req,res,next)=>{
    res.render("writequestion")
    // if(req.isAuthenticated())
    // {
    //     res.render("writequestion")
    // }
    // else res.render("login")
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

router.get("/autocomplete/",function(req,res){
    var regex = new RegExp(req.query["term"],'gi');

    var filter=Question.find({tag:regex,explanation:regex},{'tag':1,'explanation':1}).sort({"update_at":-1}).sort({"created_at":-1}).limit(5);

      filter.exec(function(err,data){
          
          var result=[];
          if(!err){
              if(data && data.length && data.length>0){
                  data.forEach(user=>{
                      let obj={
                          id:user._id,
                          label:user.tag,
                          explanation:user.explanation
                        };
                       result.push(obj); 
                  });
              }
              res.jsonp(result);
          }
          else { res.se }  
      })     
})
router.get("/level3/autocomplete/",function(req,res){
    var regex = new RegExp(req.query["term"],'gi');

    var filter=Question.find({tag:regex},{'tag':1}).sort({"update_at":-1}).sort({"created_at":-1}).limit(5);

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
    const val=req.body.difficulty;
    // console.log(val);

    // console.log(x.length);
   if(x.length>0 && val.length>0)
   {
    Question.find({tag:x,difficult:val }).exec((err,found)=>{
        if(!err)
        {
            // console.log(found);
            res.render("level3",{found : found,len:found.length,title:x,level:val});
        }
        else if(!err)
        {
            res.render("level3",{found : found,len:found.length,title:x,level:val});
        }
    })
    // console.log(found.length);
   }
   else if(x.length==0 && val.length==0)
   {
    Question.find({}).exec((err,found)=>{
        if(err)
        {
            // console.log(found);
            res.render("level3",{found : found,len:found.length,title:"",level:""});
        }
        else if(!err)
        {
            res.render("level3",{found : found,len:found.length,title:"",level:""});
        }
    })
    // console.log(found.length);
   }
   else if(x.length==0 && val.length>0)
   {
    Question.find({difficult:val}).exec((err,found)=>{
        if(err)
        {
            // console.log(found);
            res.render("level3",{found : found,len:found.length,title:"",level:val});
        }
        else if(!err)
        {
            res.render("level3",{found : found,len:found.length,title:"",level:val});
        }
    })
    // console.log(found.length);
   }
   else if(x.length>0 && val.length==0)
   {
    Question.find({tag:x}).exec((err,found)=>{
        if(err)
        {
            // console.log(found);
            res.render("level3",{found : found,len:found.length,title:x,level:""});
        }
        else if(!err)
        {
            res.render("level3",{found : found,len:found.length,title:x,level:""});
        }
    })
    // console.log(found.length);
   }
    
})


module.exports=router;