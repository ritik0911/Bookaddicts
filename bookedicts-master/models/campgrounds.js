var mongoose=require('mongoose');
var comment=require('./comment');
const campgroundschema=new mongoose.Schema({
    name: String, 
    price: Number,
    phone: Number,
    image: String,
    discription: String,
    author:{
       id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       },
       username: String
    },
   comments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'comment'
      }
   ]
  })
  module.exports=mongoose.model('campground',campgroundschema);