const mongoose = require('mongoose');

const questionschema = mongoose.Schema
({
    _id:mongoose.Schema.Types.ObjectId,
     tag:String,
     question:String,
     questionName:String,
     explanation:String,
     difficult: String,
     link:String,
     ytlink:String,
     createdAt:{ type: Date, default: Date.now }
});
module.exports=mongoose.model('Questions',questionschema);