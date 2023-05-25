import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UsersService from "../../bll/users/users.service";
import Container from "typedi";
import * as bcrypt from "bcryptjs";

export default function init() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const userService = Container.get(UsersService);
        const user = await userService.getUserByEmail(email);
        if (!user) {
          return done(
            {
              errors: { "email or password": "is invalid" },
            },
            false
          );
        }
        await bcrypt.compare(password, user.password).then((isValid) => {
          if (!isValid) {
            return done(
              {
                errors: { "email or password": "is invalid" },
              },
              false
            );
          }
          return done(null, user);
        });
      }
    )
  );
}
