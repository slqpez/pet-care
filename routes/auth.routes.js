const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkAuthenticated = require("../middlewares/isAuthenticated")


router.get("/", checkAuthenticated, function (req, res) {;
  return res.render("home");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.post("/logout", (req,res)=>{
  req.logout()
  return res.redirect("/login")
})

module.exports = router