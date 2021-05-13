const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
// const multer = require('multer');
const Blog=require("../models/blogs");

router.get("/",(req,res,next)=>{
    res.render("level1");
})




module.exports=router;