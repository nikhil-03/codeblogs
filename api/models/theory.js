const mongoose = require('mongoose');

const theoryschema = mongoose.Schema
({
    _id:mongoose.Schema.Types.ObjectId,
     tag:String,
     heading:String,
     theory:String,
     difficult: String,
     link:String,
     ytlink:String,
     createdAt:{ type: Date, default: Date.now }
});
module.exports=mongoose.model('Theory',theoryschema);