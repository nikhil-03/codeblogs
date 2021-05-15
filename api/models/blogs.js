const mongoose = require('mongoose');

const blogschema = mongoose.Schema
({
    _id:mongoose.Schema.Types.ObjectId,
     topic:String,
     title:String,
     content:String,
     tags: String,
     link:String,
     createdAt:{ type: Date, default: Date.now }
});
module.exports=mongoose.model('Codeblog',blogschema);