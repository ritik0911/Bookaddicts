
var express=require("express");
var router=express.Router();
var campground=require("../models/campgrounds");
var middleware=require("../middleware");

router.get("/books",(req,res)=>{
    
    campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("books",{campgrounds:allcampgrounds});
        }
    });
});

router.get("/add_books",middleware.isLoggedIn,(req,res)=>res.render("add_books"));

router.post('/add_books',middleware.isLoggedIn,(req,res)=>{
   var name=req.body.name;
   var price=req.body.price;
   var phone=req.body.phone;
   var image=req.body.image;
   var disc=req.body.discription;
   var author={
       id: req.user._id,
       username: req.user.username
   }
   var object={name:name,price:price,phone:phone, image:image,discription:disc,author:author};
   campground.create(object,function(err,object){
       if(err) console.log(err);
       else res.redirect("/books");
   });
});

router.get("/books/:id",(req,res)=>{
     campground.findById(req.params.id).populate("comments").exec(function(err,C){
         if(err) console.log(err);
         else {
            res.render("moreinfo",{C:C});
     }
     });
});

 router.get("/books/:id/edit",middleware.checkcampgroundownership, (req,res)=>{
    campground.findById(req.params.id,function(err,foundcampground){
    res.render("edit",{campground: foundcampground});
    });
 });

 router.put("/books/:id",middleware.checkcampgroundownership, function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var phone=req.body.phone;
    var image=req.body.image;
    var disc=req.body.discription;
    var object={name:name,price:price,phone:phone,image:image,discription:disc};
     campground.findByIdAndUpdate(req.params.id,object,function(err,uc){
         if(err){
             res.redirect("back");
         }else{
             res.redirect("/books/"+uc._id);
         }
     });
 });

 //destroy books route

 router.delete("/books/:id",middleware.checkcampgroundownership, function(req,res){
     campground.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/books");
         }else{
             res.redirect("/books");
         }
     });
 });

module.exports=router;