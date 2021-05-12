const express = require('express');
// const { rawListeners } = require('../../app');
const router = express.Router();
// const Product = require('../models/product');
const mongoose = require('mongoose');
const { json } = require('body-parser');
// const multer = require('multer');
// const product = require('../models/product');

router.get("/",(req,res,next)=>{
    res.render("level2");
})




module.exports=router;