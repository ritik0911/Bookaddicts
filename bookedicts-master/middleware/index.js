var campground=require("../models/campgrounds");
var comment=require("../models/comment");

var middleware={};

middleware.checkcampgroundownership=function(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,foundcampground){
            if(err){
                req.flash("error","book not found");
                res.redirect("back");
            }else{
                if(foundcampground.author.id.equals(req.user._id)){
                   next();
                }
               else{
                req.flash("error","you don't have permission to do that");
                   res.redirect("back");
               }
            }
        })
      }else{
          res.redirect("back");
      }
 }

 middleware.checkcommentownership=function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err){
                res.redirect("back");
            }else{
                if(foundcomment.author.id.equals(req.user._id)){
                   next();
                }
               else{
                req.flash("error","you don't have permission to do that");
                   res.redirect("back");
               }
            }
        })
      }else{
        req.flash("error","you need to be log in first");
          res.redirect("back");
      }
 }

 middleware.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be log in first");
    res.redirect("/login");
 }


 module.exports=middleware;