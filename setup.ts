import express from "express";
import cookieParser from "cookie-parser";
import { createLogger } from "@liplum/log";

export const log = createLogger();
export const app: express.Express = express();
export const userRouter: express.Router = express.Router();

app.use(cookieParser());

const v1 = express.Router();
app.use("/v1", v1);
v1.use("/user", userRouter);
