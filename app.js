var express     = require("express"), 
    app         = express(), 
    bodyParser  = require("body-parser"), 
    mongoose    = require("mongoose"),
    flash       = require("connect-flash");
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    dotenv      = require('dotenv');

dotenv.config();

// Requiring Routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

mongoose.set('useUnifiedTopology', true);
// "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.favaz.mongodb.net/"+ process.env.DB_NAME +"?retryWrites=true&w=majority"
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("ERROR: ", err.message);
})

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// console.log(__dirname);
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hustling is forever and endless. I will grind till I die",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});


// Campground.create({
//     name: "Granite Hill", 
//     image: "https://d2ciprw05cjhos.cloudfront.net/files/v3/styles/gs_standard/public/images/18/06/gettyimages-649155058.jpg?itok=DG3f7cE4",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, function(err, campground){
//     if(err) console.log(err);
//     else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server has started!");
});