import * as express from "express";
import { RequestUser } from "./users.interface";

export interface RequestWithUser extends express.Request {
  user: RequestUser;
}
