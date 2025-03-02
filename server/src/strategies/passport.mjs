import passport from "passport";
import { User } from "../mongoose/users.mjs";
import { Admin } from "../mongoose/admins.mjs";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

// Define Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use email as the username
    },
    async (email, password, done) => {
      try {
        // Check if the user is an admin first
        let user = await Admin.findOne({ email });
        if (!user) {
          // If not an admin, check in the user collection
          user = await User.findOne({ email });
        }

        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = (await User.findById(id)) || (await Admin.findById(id));
  done(null, user);
});
