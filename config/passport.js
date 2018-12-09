var db = require("../models");

var localStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
    // User.findById(id, function(err, user) {
    //   cb(err, user);
    // });
    cb(null, user);
  });
  passport.use(
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        /* eslint-disable-next-line */
        /*database.query("SELECT * from users WHERE username = \"" + username + "\" AND password = \"" + password + "\"",
          function(error, results) {
            if (error) {
              return done(null, false, req.flash("login", "login failed"));
            }

            return done(null, results[0]);
          }
        );*/
        db.Users.findOne({
          username: username,
          password: password
        })
          .then(function(user) {
            return done(null, user);
          })
          .catch(function(error) {
            return done(
              null,
              false,
              req.flash("login", "login failed: " + error.message)
            );
          });
      }
    )
  );
};
