var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var Localstrategy = require("passport-local");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var User = require("./models/user.js");
var campground = require("./models/campgrounds.js");
var comment = require("./models/comment.js");

var bookRoutes = require("./routes/books.js"),
    commentRoutes = require("./routes/comments.js"),
    indexRoutes = require("./routes/index.js");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected....."))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  require("express-session")({
    secret: "yeah huhhh",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(bookRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
    console.log("Server has started at port " + PORT);
  });
