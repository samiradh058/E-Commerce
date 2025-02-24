import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../mongoose/users.mjs";

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    done(null, user);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, {
          message: "User not found, error coming from local-strategy.mjs",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, {
          message: "Incorrect password, error coming from local-strategy.mjs",
        });
      }
      return done(null, user);
    }
  )
);

export default passport;
