import express from "express";

const devErrors = (error: any, res: express.Response) => {
  res.status(error.statusCode!).json({
    error: error,
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const prodErrors = (error: any, res: express.Response) => {
  res.status(error.statusCode!).json({
    status: error.status,
    message: error.message,
  });
};

const glopalErrors = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(error, res);
  } else {
    prodErrors(error, res);
  }
};

export default glopalErrors;
