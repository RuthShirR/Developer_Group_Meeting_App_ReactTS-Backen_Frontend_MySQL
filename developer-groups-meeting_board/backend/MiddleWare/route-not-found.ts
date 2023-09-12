
import { Request, Response, NextFunction } from "express";

import { RouteNotFoundError } from "../Models/Client-Errors";

// ------------------------------
// MIDDLEWARE FOR ERROR HANDLING
// ------------------------------

const ErrorHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const err = new RouteNotFoundError(request.originalUrl);
  next(err);
};

export default ErrorHandler;

