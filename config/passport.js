const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../model/users");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};
try {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      try {
        const user = await Users.findById(payload.id);
        if (!user) {
          return done(new Error("User not found"), false);
        }
        if (!user.verify) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, true);
      }
    })
  );
} catch (error) {
  console.log(`error massage=${error.message}`);
}
