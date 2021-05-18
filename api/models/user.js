const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    img:String,
    name:String,
    googleId:String
  });
  userSchema.plugin(findOrCreate);
//   const User = new mongoose.model('User', userSchema);
  module.exports=mongoose.model('User', userSchema);






// module.exports=mongoose.model('Codeblog',blogschema);