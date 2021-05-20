const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');

const found=[];
router.get('/',(req,res,next)=>{
    res.render("index",{found:found});
})










module.exports=router;