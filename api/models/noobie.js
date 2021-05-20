const mongoose = require('mongoose');

const noobieschema = mongoose.Schema
({
    _id:mongoose.Schema.Types.ObjectId,
     topic:String,
     theory:String,
     link:String,
     ytlink:String,
     createdAt:{ type: Date, default: Date.now }
});
module.exports=mongoose.model('Noobie',noobieschema);