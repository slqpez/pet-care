const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy


 passport.use(
  new LocalStrategy(function (username, password, done) {
    if (username === "test" && password === "123") {
      return done(null, { username: "test", password: "123" });
    }else{
      return done(null, false);
    }
    
    if (err) return done(err);
  })
); 





passport.serializeUser(function(user, done) {
  done(null, user.username); 
});

passport.deserializeUser(function(username, done) {
  done(null, { username:"test", password:"123" });
});

module.exports = passport;
