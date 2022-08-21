const express = require("express");
const {mongoose} = require("./database.js");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//initialize
const PORT = process.env.PORT || 8000;
const app = express();
require("./config/passport.js");

//settings
app.set("port", PORT);
//middleware
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


//routes

app.use(require("./routes/ListaPersonajes"));
// app.use(require("./routes/ListaPeliculas"));
// app.use(require("./routes/ListaGeneros"));
app.use(require("./routes/users"));

// starting server

app.listen(app.get("port"), () => {
  console.log(`app listening on ${app.get("port")}`);
});
