var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");


router.get("/",function (req, res) {
    if(req.user) {
      res.redirect("/books");
    } else {
      res.render("landing");
    }
  });


router.get("/register",(req,res)=>{
  if(req.user) {
    res.redirect("/");
  } else {
    res.render("register");
  }
});

router.post("/register", (req,res)=>{
    var newUser= new User({username: req.body.username});
    User.register(newUser,req.body.password,(err,user)=>
    {
          if(err){
               req.flash("error",err.message);
              res.render("register");
          }
          passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to Book Addicts "+ user.username);
               res.redirect("/books");
          });
    });
});

//login routh================

router.get("/login",(req,res)=>{
  if(req.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/books",
  failureRedirect:"/login"
}) ,(req,res)=>{

});

//logout======================

router.get("/logout",(req,res)=>{
    req.logout(function (err) {
		if (err) {
			return next(err);
		} else {
            res.redirect("/books");
            req.flash("success","logged you out!");
		}
	});
});

module.exports=router;