import * as express from "express";
import * as session from "express-session";
import * as formidable from "express-formidable";
import passportConfig from "./utils/passportConfig";
import errorHandle from "./utils/errorHandle";
import { logRequest } from "./utils/logger";

const bodyFormDataMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const isFormData = req.headers["content-type"]?.includes(
    "multipart/form-data"
  );
  if (isFormData) {
    formidable()(req, res, next);
  } else {
    express.json()(req, res, next);
  }
};

const fieldsToBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req["fields"]) {
    req.body = req["fields"];
  }
  next();
};

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    passportConfig();
    this.initializeControllers(controllers);
    this.initializeErrorHandle();
  }

  private initializeMiddlewares() {
    this.app.use(express.static("public"));
    this.app.use(
      session({
        secret: "secret",
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(bodyFormDataMiddleware);
    this.app.use(fieldsToBody);
    //this.app.use(express.json());
    //this.app.use(formidable());
    this.app.use(logRequest);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private initializeErrorHandle() {
    this.app.use(errorHandle);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
