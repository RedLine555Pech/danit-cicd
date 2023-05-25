import * as jwt from "jsonwebtoken";
import * as express from "express";
//import { RequestWithUser } from "../../types/express.extention";

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "QWE123");
    req["auth"] = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
