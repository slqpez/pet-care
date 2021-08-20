require("dotenv").config();
require("./config/passport.config.js");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const authRouter = require("./routes/auth.routes")

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    saveUninitialized: false,
    resave: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
