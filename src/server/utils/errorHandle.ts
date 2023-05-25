import { Request, Response, NextFunction } from "express";
import { AppError } from "./customErrors";
import logger from "./logger";
import sentryLog from "./sentry";

const errorHandle = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  if (err instanceof AppError) {
    return res.status(err.httpCode).json({ message: err.message });
  }
  sentryLog(err);
  res.status(500).send("Something is wrong");
};

export default errorHandle;
