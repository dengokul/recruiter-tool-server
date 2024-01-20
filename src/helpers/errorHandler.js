import { ApolloError } from "apollo-server-errors";

export class MyError extends ApolloError {
  constructor(message) {
    super(message, "MY_ERROR_CODE");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
}

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

export default errorHandler;

