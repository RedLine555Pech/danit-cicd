class Passport {
  strs: [];
  use = (str) => {
    this.strs[str.name] = str;
  };

  authenticate = (strategy, opts, cb: (err, user, info) => void) => {
    return function (res, res, next) {
      const str = this.strs[strategy];
      str.func(res.body.email, res.body.password, cb);
    };
  };
}

class STR {
  name;
  func: (email, password) => void;
  constructor(fields: any, name, func) {
    this.func = func;
  }
}

const passport = new Passport();
passport.authenticate(
  "local",
  { session: false },
  (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;

      user.token = jwt.sign({ user_id: user.id, email: user.email }, "secret", {
        expiresIn: "2h",
      });

      user.password = "";

      return response.json({ user });
    }

    return response.status(400).send(info);
  }
)(request, response, next);

passport.use(
  new STR(
    {
      usernameField: "email",
      passwordField: "password",
    },
    "local",
    (email, password, done) => {
      //   const userService = Container.get(UsersService);
      //   const user = userService.getUserByEmail(email);
      //   if (!user) {
      //     return done(
      //       {
      //         errors: { "email or password": "is invalid" },
      //       },
      //       false
      //     );
      //   }
      //   bcrypt.compare(password, user.password).then((isValid) => {
      //     if (!isValid) {
      //       return done(
      //         {
      //           errors: { "email or password": "is invalid" },
      //         },
      //         false
      //       );
      //     }
      //     return done(null, user);
      //   });
    }
  )
);
